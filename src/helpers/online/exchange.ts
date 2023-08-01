import {
    Balance,
    Balances,
    Exchange,
    OHLCV,
    OrderBook,
    Ticker,
    Trade,
    binance
} from "ccxt";

import { EXCHANGE_CONFIG } from "configs/global.config";
import logger from "utils/logger";


/**
 * Parse the trading pair to two tokens.
 * @param tradingPair The trading pair.
 * @returns The tokens (base & quote).
 */
export function parseTradingPair(tradingPair: string) {
    const tokens = tradingPair.split("/");

    return {
        base: tokens[0],
        quote: tokens[1]
    };
}

/**
 * Load the a exchange instance (rate limited).
 *
 * **WARNING!** Should be called once per application.
 * @returns The exchange.
 */
export function loadExchange(sandbox: boolean): Exchange {
    const keys = {
        apiKey: sandbox ? EXCHANGE_CONFIG.sandboxApiKey : EXCHANGE_CONFIG.apiKey,
        secret: sandbox ? EXCHANGE_CONFIG.sandboxApiSecret : EXCHANGE_CONFIG.apiSecret
    };

    const exchange = new binance({
        apiKey: keys.apiKey,
        secret: keys.secret,
        enableRateLimit: true
    });

    exchange.setSandboxMode(sandbox);

    // Log the exchange information
    logger.verbose(
        `${exchange.name} exchange loaded in ${sandbox ? "sandbox" : "production"} mode.`
    );

    return exchange;
}

/**
 * Check the exchange status.
 *
 * NOTES:
 * - The printed eta represents when the maintenance/outage is expected to end.
 * - The exchange status is not available in sandbox mode, skipping it.
 *
 * @param exchange The exchange.
 * @param fatal If the exchange is not reliable, should the application exit? (default: true)
 * @returns The status (boolean if status -> ok).
 */
export async function checkExchangeStatus(exchange: Exchange, fatal = true): Promise<boolean> {
    let status;

    try {
        status = await exchange.fetchStatus();
    } catch (error) {
        logger.warn(`${exchange.name} status check is unavailable in sandbox mode! Skipping...`);
        return true;
    }

    // Log the status information
    const eta = status.eta ? new Date(status.eta).toLocaleString() : "N/A";

    logger.info(`${exchange.name} status successfully checked.`);
    logger.verbose(`${exchange.name} status: ${status.status}, eta: ${eta}.`);

    // Fatal error if exchange is not reliable
    if (status.status !== "ok") {
        logger.error("exchange is not reliable!");

        if (fatal) {
            process.exit(1);
        }
    }

    return status.status === "ok";
}

/**
 * Load the CCXT markets (complete).
 * @param exchange The exchange.
 * @returns The markets.
 */
export async function loadMarkets(exchange: Exchange): Promise<void> {
    await exchange.loadMarkets();

    // Log the market information
    logger.verbose(`${exchange.name} markets loaded.`);
}


/**
 * Fetch the latest ticker data by trading symbol.
 * @param exchange The exchange.
 * @param symbol The symbol.
 * @returns The ticker.
 */
export async function fetchTicker(exchange: Exchange, symbol: string): Promise<Ticker> {
    const ticker = await exchange.fetchTicker(symbol);

    // Log the ticker information
    logger.verbose(`${exchange.name} ticker fetched for ${symbol}.`);

    return ticker;
}

/**
 * Fetch the order book for a symbol.
 * @param exchange The exchange.
 * @param symbol The symbol.
 * @returns The order book.
 */
export async function fetchOrderBook(exchange: Exchange, symbol: string): Promise<OrderBook> {
    const orderBook = await exchange.fetchOrderBook(symbol);

    // Log the order book information
    logger.verbose(`${exchange.name} order book fetched for ${symbol}.`);

    return orderBook;
}

/**
 * Fetch the trades for a symbol.
 * @param exchange The exchange.
 * @param symbol The symbol.
 * @returns The trades.
 */
export async function fetchTrades(exchange: Exchange, symbol: string): Promise<Trade[]> {
    const trades = await exchange.fetchTrades(symbol);

    // Log the trades information
    logger.verbose(`${exchange.name} trades fetched for ${symbol}.`);

    return trades;
}

/**
 * Fetch the OHLCV (Open, High, Low, Close, and Volume) candles for a symbol.
 * @param exchange The exchange.
 * @param symbol The symbol.
 * @param timeframe The timeframe.
 * @param since The since (in ms).
 * @param limit The limit.
 * @returns The OHLCV candles.
 */
export async function fetchOHLCV(
    exchange: Exchange,
    symbol: string,
    timeframe = "1m",
    since: number | undefined = undefined,
    limit = 60
): Promise<OHLCV[]> {
    let OHLCVs: OHLCV[] = [];

    try {
        OHLCVs = await exchange.fetchOHLCV(symbol, timeframe, since, limit);
    } catch {
        logger.error("Invalid parameter(s) for the OHLCV request.");
    }

    // Log the OHLCV information
    logger.verbose(`${exchange.name} OHLCV fetched for ${symbol} (${limit} x ${timeframe}).`);

    return OHLCVs;
}

/**
 * Fetch the exchange time to get the local/exchange time synchronization difference.
 * @param exchange The exchange.
 * @returns The time (UNIX).
 */
export async function exchangeTimeDifference(exchange: Exchange): Promise<number> {
    let fetchTimeDelay = performance.now();
    const serverTime = await exchange.fetchTime();
    fetchTimeDelay = performance.now() - fetchTimeDelay;
    const localTime = Date.now();

    const timeDifference = serverTime - (localTime + Math.round(fetchTimeDelay));

    // Log the time information
    logger.verbose(`Difference between ${exchange.name} and local time: ${timeDifference}ms.`);

    return timeDifference;
}

/**
 * Load the exchange balances (every token).
 * @param exchange The exchange.
 * @returns The balances.
 */
export async function loadBalances(exchange: Exchange) {
    const balances = await exchange.fetchBalance();

    // Log the balance information
    logger.verbose(`${exchange.name} balances loaded.`);

    return balances;
}

/**
 * Fetch balance by token based on the balances dictionary.
 * @param balances The loaded balances.
 * @param token The token.
 * @returns The balance.
 */
export function getBalance(balances: Balances, token: string): Balance {
    const balance = balances[token];

    if (!balance) {
        logger.error(`The token ${token} is not available!`);
        process.exit(1);
    }

    // Log the balance information
    logger.info(`${balance.free} ${token} available, ${balance.used} ${token} used.`);

    return balance;
}
