import NsBotObject from "types/botObject";


/**
 * The trade object, containing info about a trade.
 *
 * This object is used as a base to create a trade object to be sent to the database
 * under the "shared" category, "arrays" subcategory, inside the "history" array.
 */
export const tradeObject: NsBotObject.IsTradeObject = {
    timestamp: 0,                          // Timestamp of the trade (Unix timestamp in ms)
    date: "",                              // Date of the trade (dateFormat)
    currency: "",                          // Trade currency (base or quote currency name)
    side: "",                              // Trade side ("BUY" or "SELL")
    price: 0,                              // Trade price
    amount: 0,                             // Trade amount
    fee: 0                                 // Trade fee
};

/**
 * The bot object, working with the database to sync and store data.
 *
 * This object contains multiple categories, each one with a specific purpose:
 *
 * @param start Sent to the database when the bot is started (overriding the data inside the DB).
 * @param stop Sent to the database when the bot is stopped (overriding the data inside the DB).
 * @param shared Shared with the database (recovered from the DB then updated).
 * @param local Not shared with the database (only used locally).
 * @param specials Special data not matching other categories.
 */
export const botObject: NsBotObject.IsBotObject = {
    start: {
        // Bot info
        name: "",                          // Bot name (used for bot ID inside the database)
        id: "",                            // Bot object identifier (MongoDB objectID)
        sandbox: false,                    // Sandbox mode

        // Bot balances
        tradingPair: "",                   // Trading pair
        baseCurrency: "",                  // Base currency
        baseBalance: null,                 // Base balance
        quoteCurrency: "",                 // Quote currency
        quoteBalance: null,                // Quote balance
        initialQuoteBalance: 0,            // Initial quote balance to start with

        // OHLCV
        ohlcvLimit: 0,                     // OHLCV limit (in number of candles)

        // Timestamps
        lastStartTime: "",                 // Last start time
        timeframe: 0,                      // Timeframe  (in ms)
    },

    stop: {
        lastStopTime: "",                  // Last stop time
    },

    shared: {
        // List of arrays for average calculations
        arrays: {
            tradeSizes: [],                // Trade sizes
            tradeDurations: [],            // Trade durations
            tradeProfits: [],              // Trade profits
            feesPerTrade: [],              // Fees per trade
            dailyProfits: [],              // Daily profits
            history: [],                   // Trade history
        },

        // Iterations
        generalIterations: 0,              // Number of general iterations
        mainIterations: 0,                 // Number of main iterations

        // General trading statistics
        tradeSuccessRate: 0,               // Trade success rate (in %)
        maxDrawdown: 0,                    // Maximum drawdown (max loss in %)
        maxConsecutiveWins: 0,             // Maximum consecutive wins
        maxConsecutiveLosses: 0,           // Maximum consecutive losses

        // Total trading statistics
        totalTrades: 0,                    // Number of total trades
        totalTradesWon: 0,                 // Number of total trades won
        totalTradesLost: 0,                // Number of total trades lost
        totalTradeVolume: 0,               // Total trade volume (in quote currency)
        totalFees: 0,                      // Total fees (in quote currency)
        totalProfit: 0,                    // Total profit (in quote currency)

        // Average trading statistics
        avgTradeSize: 0,                   // Average trade size (in quote currency)
        avgTradeDuration: 0,               // Average trade duration (in seconds)
        avgTradeProfit: 0,                 // Average trade profit (in quote currency)
        avgFeePerTrade: 0,                 // Average fee per trade (in quote currency)
        avgDailyProfitPercentage: 0        // Average daily profit percentage (in %)
    },

    local: {
        // Promise to wait for the bot to be initialized
        initialized: new Promise<void>(() => null),

        // Timeframe
        stringTimeframe: "1m",             // Timeframe (in string format)

        // Bot statuses
        running: false,                    // If the bot is running
        networkCheck: false,               // If the network check passed

        // Loaded from CCXT
        exchange: null,                    // Exchange
        balances: null,                    // Exchange balances

        // Cache
        cache: null,                       // Cache (OHLCV & other data)
    },

    specials: {
        // Timestamps
        initTime: "",                      // First initialization time
        lastSharedUpdate: "",               // Last shared object update time

        // Timings
        mainTimeframeCorrector: 0,         // Last timeframe corrector for main iterations (in ms)
        timeDifference: 0,                 // Last time difference between the exchange and the bot
    }
};