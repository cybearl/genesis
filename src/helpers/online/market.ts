import {
    Exchange as Market,
    OHLCV,
    OrderBook,
    Ticker,
    Trade,
    binance
} from "ccxt";

import { MARKET_CONFIG } from "configs/global.config";
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
 * Load the a market instance (rate limited).
 *
 * **WARNING!** Should be called once per application.
 * @returns The market.
 */
export function loadMarket(sandbox: boolean): Market {
    const keys = {
        apiKey: sandbox ? MARKET_CONFIG.sandboxApiKey : MARKET_CONFIG.apiKey,
        secret: sandbox ? MARKET_CONFIG.sandboxApiSecret : MARKET_CONFIG.apiSecret
    };

    const market = new binance({
        apiKey: keys.apiKey,
        secret: keys.secret,
        enableRateLimit: true
    });

    market.setSandboxMode(sandbox);

    // Log the market information
    logger.verbose(
        `${market.name} market loaded in ${sandbox ? "sandbox" : "production"} mode.`
    );

    return market;
}

/**
 * Check the market status.
 *
 * NOTES:
 * - The printed eta represents when the maintenance/outage is expected to end.
 * - The market status is not available in sandbox mode, skipping it.
 *
 * @param market The market.
 * @param fatal If the market is not reliable, should the application exit? (default: true)
 * @returns The status (boolean if status -> ok).
 */
export async function checkMarketStatus(market: Market, fatal = true): Promise<boolean> {
    let status;

    try {
        status = await market.fetchStatus();
    } catch (error) {
        logger.warn(`${market.name} status check is unavailable in sandbox mode! Skipping...`);
        return true;
    }

    // Log the status information
    const eta = status.eta ? new Date(status.eta).toLocaleString() : "N/A";

    logger.info(`${market.name} status successfully checked.`);
    logger.verbose(`${market.name} status: ${status.status}, eta: ${eta}.`);

    // Fatal error if market is not reliable
    if (status.status !== "ok") {
        logger.error("market is not reliable!");

        if (fatal) {
            process.exit(1);
        }
    }

    return status.status === "ok";
}

/**
 * Load the CCXT market (complete).
 * @param market The market.
 * @returns The markets.
 */
export async function loadMarkets(market: Market): Promise<void> {
    await market.loadMarkets();

    // Log the market information
    logger.verbose(`${market.name} markets loaded.`);
}


/**
 * Fetch the latest ticker data by trading symbol.
 * @param market The market.
 * @param symbol The symbol.
 * @returns The ticker.
 */
export async function fetchTicker(market: Market, symbol: string): Promise<Ticker> {
    const ticker = await market.fetchTicker(symbol);

    // Log the ticker information
    logger.verbose(`${market.name} ticker fetched for ${symbol}.`);

    return ticker;
}

/**
 * Fetch the order book for a symbol.
 * @param market The market.
 * @param symbol The symbol.
 * @returns The order book.
 */
export async function fetchOrderBook(market: Market, symbol: string): Promise<OrderBook> {
    const orderBook = await market.fetchOrderBook(symbol);

    // Log the order book information
    logger.verbose(`${market.name} order book fetched for ${symbol}.`);

    return orderBook;
}

/**
 * Fetch the trades for a symbol.
 * @param market The market.
 * @param symbol The symbol.
 * @returns The trades.
 */
export async function fetchTrades(market: Market, symbol: string): Promise<Trade[]> {
    const trades = await market.fetchTrades(symbol);

    // Log the trades information
    logger.verbose(`${market.name} trades fetched for ${symbol}.`);

    return trades;
}

/**
 * Fetch the OHLCV (Open, High, Low, Close, and Volume) candles for a symbol.
 * @param market The market.
 * @param symbol The symbol.
 * @param timeframe The timeframe.
 * @param since The since (in ms).
 * @param limit The limit.
 * @returns The OHLCV candles.
 */
export async function fetchOHLCV(
    market: Market,
    symbol: string,
    timeframe = "1m",
    since: number | undefined = undefined,
    limit = 60
): Promise<OHLCV[]> {
    let OHLCVs: OHLCV[] = [];

    try {
        OHLCVs = await market.fetchOHLCV(symbol, timeframe, since, limit);
    } catch {
        logger.error("Invalid parameter(s) for the OHLCV request.");
    }

    // Log the OHLCV information
    logger.verbose(`${market.name} OHLCV fetched for ${symbol} (${limit} x ${timeframe}).`);

    return OHLCVs;
}

/**
 * Fetch the market time to get the local/market time synchronization difference.
 * @param market The market.
 * @returns The time (UNIX).
 */
export async function marketTimeDifference(market: Market): Promise<number> {
    let fetchTimeDelay = performance.now();
    const serverTime = await market.fetchTime();
    fetchTimeDelay = performance.now() - fetchTimeDelay;
    const localTime = Date.now();

    const timeDifference = serverTime - (localTime + Math.round(fetchTimeDelay));

    // Log the time information
    logger.verbose(`Difference between ${market.name} and local time: ${timeDifference}ms.`);

    return timeDifference;
}