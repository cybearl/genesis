import { Exchange } from "ccxt";
import lodash from "lodash";
import { Db } from "mongodb";

import Cache from "classes/cache";
import { botObject } from "configs/botObject.config";
import { EXCHANGE_CONFIG, GENERAL_CONFIG } from "configs/global.config";
import {
    checkExchangeStatus,
    exchangeTimeDifference,
    getBalance,
    loadBalances,
    loadExchange,
    loadMarkets,
    parseTradingPair
} from "helpers/exchange";
import {
    getCurrentDateString,
    getObjectId,
    getTimeframe,
    getUserInput
} from "helpers/inputs";
import {
    checkNetwork,
    closeDBConnection,
    connectToDB,
    sendBotObjectCategory,
    sendOrGetInitialBotObject
} from "helpers/network";
import NsBotObject from "types/botObject";
import NsGeneral from "types/general";
import logger from "utils/logger";


/**
 * Main class of the bot.
 */
export default class Bot {
    private _botObject = lodash.cloneDeep(botObject);
    private _mongoDB: NsBotObject.IsMongoDB = {
        mongoClient: null,
        mongoDB: null
    };


    /**
     * Creates a new bot instance and initialize it.
     *
     * @param tradingPair The trading pair (overridden in sandbox mode).
     * @param name The bot name (used for bot ID inside the database).
     * @param sandbox If the bot should run in sandbox mode.
     * @param initialQuoteBalance The initial quote balance to start with.
     * @param timeframe The timeframe to use (optional, defaults to 1m).
     * @param ohlcvLimit The limit of OHLCV candles (optional, defaults to 128).
     * @returns The bot instance.
     */
    constructor(
        tradingPair: string,
        name: string,
        sandbox = true,
        initialQuoteBalance = 0,
        timeframe: NsGeneral.IsTimeframe = "1m",
        ohlcvLimit = 128
    ) {
        // Sandbox mode overrides the trading pair
        // As most of currencies are not available in sandbox mode
        if (sandbox) {
            tradingPair = EXCHANGE_CONFIG.sandboxTradingPair;
        }

        // Bot static parameters
        this._botObject.start.name = name;
        this._botObject.start.id = getObjectId(sandbox, name);
        this._botObject.start.sandbox = sandbox;

        // Trading pair
        const tokens = parseTradingPair(tradingPair);
        this._botObject.start.tradingPair = tradingPair;
        this._botObject.start.baseCurrency = tokens.base;
        this._botObject.start.quoteCurrency = tokens.quote;
        this._botObject.start.initialQuoteBalance = initialQuoteBalance;

        // Timestamps
        this._botObject.local.stringTimeframe = timeframe;
        this._botObject.start.timeframe = getTimeframe(timeframe);
        this._botObject.start.ohlcvLimit = ohlcvLimit;

        // Logging
        logger.info(`New '${name}' bot instance for '${tradingPair}' created.`);
        logger.info(`Sandbox mode: ${sandbox ? "enabled" : "disabled"}`);
        logger.info(`Initial quote balance: ${initialQuoteBalance} ${tradingPair.split("/")[1]}`);
        logger.info(`Timeframe: ${timeframe}`);

        // Initialize the bot
        this._botObject.local.initialized = this._initialize();
    }


    /**
     * Initialize the bot.
     */
    private async _initialize(): Promise<void> {
        // Real mode warning with user input (FATAL)
        if (!this._botObject.start.sandbox) {
            const answer = await getUserInput(
                "Sandbox mode is disabled! Would you like to continue? (y/n)"
            );

            if (answer !== "y") {
                logger.info("Exiting...");
                process.exit(0);
            }
        }

        // Check the network (FATAL)
        if (!this._botObject.start.sandbox) {
            this._botObject.local.networkCheck = await checkNetwork();
        } else {
            logger.info("Skipping network check in sandbox mode...");
            this._botObject.local.networkCheck = true;
        }

        if (this._botObject.local.networkCheck) {
            // Connect to MongoDB (FATAL)
            this._mongoDB = await connectToDB();

            // Load the exchange
            this._botObject.local.exchange = loadExchange(this._botObject.start.sandbox);

            // Check the exchange status (FATAL)
            // Endpoint not available in sandbox mode
            await checkExchangeStatus(this._botObject.local.exchange);

            // Load the markets
            await loadMarkets(this._botObject.local.exchange);

            // Local/Exchange time difference
            this._botObject.specials.timeDifference = await exchangeTimeDifference(
                this._botObject.local.exchange
            );

            // Load the balances
            this._botObject.local.balances = await loadBalances(
                this._botObject.local.exchange
            );

            // Get the balances
            this._botObject.start.baseBalance = getBalance(
                this._botObject.local.balances,
                this._botObject.start.baseCurrency
            );

            this._botObject.start.quoteBalance = getBalance(
                this._botObject.local.balances,
                this._botObject.start.quoteCurrency
            );

            // Check the balances
            if (this._botObject.start.baseBalance === null) {
                logger.error(`The base currency ${this._botObject.start.baseCurrency} is not available!`);
                process.exit(1);
            }

            if (this._botObject.start.quoteBalance === null) {
                logger.error(`The quote currency ${this._botObject.start.quoteCurrency} is not available!`);
                process.exit(1);
            }

            // Get the cache (OHLCV & other data)
            this._botObject.local.cache = new Cache(
                this._botObject.local.exchange,
                this._botObject.start.tradingPair,
                this._botObject.local.stringTimeframe,
                this._botObject.start.ohlcvLimit
            );

            // Load the initial cache
            await this._botObject.local.cache.load();

            // Send or get the initial bot object
            this._botObject = await sendOrGetInitialBotObject(
                this._mongoDB.mongoDB as Db,
                this._botObject
            );
        } else {
            logger.error("Network is not reliable, cannot connect to MongoDB!");
            process.exit(1);
        }
    }

    /**
     * General loop of the bot (no precision corrector).
     * Used for the shared object update and other data collections.
     */
    private async _generalLoop(): Promise<void> {
        while (this._botObject.local.running) {
            // Verifies if the bot is still running
            // Because the bot could be stopped during the loop
            if (this._botObject.local.running && this._mongoDB.mongoDB) {
                this._botObject.specials.timeDifference = await exchangeTimeDifference(
                    this._botObject.local.exchange as Exchange
                );

                // General shared object update
                this._botObject.shared.generalIterations += 1;

                // Update the shared object
                await sendBotObjectCategory(this._mongoDB.mongoDB as Db, this._botObject, "shared");
            }

            await new Promise(resolve => setTimeout(
                resolve,
                this._botObject.start.timeframe * GENERAL_CONFIG.timeframeFactorForGeneralLoop
            ));
        }
    }

    /**
     * The main loop of the bot.
     */
    private async _mainLoop(): Promise<void> {
        while (this._botObject.local.running) {
            let timeframeCorrector = performance.now();

            // Update the cache
            if (this._botObject.local.cache) {
                await this._botObject.local.cache.update();
            }

            const priceBars = this._botObject.local.cache?.priceBars;
            console.log(priceBars);

            // Calls the strategy pool, which will call the strategies
            // Should decide if the data are recovered here or in the strategy pool
            // Note that a part of the data are necessary at this level for trailing stop loos
            // and profit calculation

            // Mostly, not that much data is needed, as most of the data used by strategies
            // are averages from the OHLCV data

            // The OHLCV should not be called at every iteration as it is not necessary
            // for last data, the best thing to do is to create a cache with an unix timestamp for
            // each value, at the next iteration, just recover X missing values.

            timeframeCorrector = performance.now() - timeframeCorrector;

            // Update the shared object
            this._botObject.shared.mainIterations += 1;

            // Handle main time frame corrector special
            this._botObject.specials.mainTimeframeCorrector = parseFloat(timeframeCorrector.toFixed(4));

            const delay = parseFloat(
                (this._botObject.start.timeframe - timeframeCorrector).toFixed(4)
            );

            await new Promise(resolve => setTimeout(
                resolve,
                delay
            ));
        }
    }

    /**
     * Start the bot.
     */
    public async start(): Promise<void> {
        // Await the initialization
        await this._botObject.local.initialized;

        // Main Loop
        this._botObject.local.running = true;

        // Updates the last start time
        this._botObject.start.lastStartTime = getCurrentDateString();

        // Update the shared object
        await sendBotObjectCategory(this._mongoDB.mongoDB as Db, this._botObject, "start");

        await Promise.all([
            this._generalLoop(),
            this._mainLoop()
        ]);
    }

    /**
     * Stop the bot.
     */
    public async stop(): Promise<void> {
        // Await the initialization
        await this._botObject.local.initialized;

        // Stop the bot
        this._botObject.local.running = false;

        // Update the shared object
        this._botObject.stop.lastStopTime = getCurrentDateString();

        if (this._mongoDB.mongoDB) {
            // Also sends the shared obj from the last iterations (in case of general loop delay)
            await sendBotObjectCategory(this._mongoDB.mongoDB as Db, this._botObject, "shared");
            await sendBotObjectCategory(this._mongoDB.mongoDB as Db, this._botObject, "stop");

            // Close the MongoDB connection
            if (this._mongoDB && this._mongoDB.mongoClient) {
                await closeDBConnection(this._mongoDB.mongoClient);
            }
        }

        // Log the bot stop
        logger.info("Bot stopped.");
    }
}