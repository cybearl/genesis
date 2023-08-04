import { Exchange, OHLCV } from "ccxt";

import { getTimeframe } from "helpers/local/IO";
import { fetchOHLCVs } from "helpers/online/exchange";
import { convertOHLCVsToPriceBars } from "helpers/online/strategy";
import NsGeneral from "types/general";
import NsStrategy from "types/strategy";
import logger from "utils/logger";


/**
 * A cache containing optimized exchange calls,
 * and calculated data such as averages.
 */
export default class Cache {
    private _firstLoad = true;
    private _exchange: Exchange;
    private _tradingPair: string;
    private _timeframe: NsGeneral.IsTimeframe;
    private _nbTimeframe: number;
    private _ohlcvLimit: number;
    private _OHLCVs: OHLCV[] = [];
    private _priceBars: NsStrategy.priceBar[] = [];


    /**
     * Creates a new cache containing optimized exchange calls.
     * @param exchange The initialized exchange.
     * @param tradingPair The trading pair.
     * @param timeframe The timeframe.
     * @param ohlcvLimit The limit of OHLCV candles.
     */
    constructor(
        exchange: Exchange,
        tradingPair: string,
        timeframe: NsGeneral.IsTimeframe,

        // OHLCV
        ohlcvLimit: number
    ) {
        // Static parameters
        this._exchange = exchange;
        this._tradingPair = tradingPair;
        this._timeframe = timeframe;
        this._nbTimeframe = getTimeframe(timeframe);
        this._ohlcvLimit = ohlcvLimit;
    }

    /**
     * Sorts the OHLCV candles by time.
     * Note: removes the oldest candles while also removing the duplicates.
     * @returns True if the OHLCV candles are correct, false otherwise.
     */
    private async _sortOHLCV(): Promise<boolean> {
        // Remove the oldest candles while also removing the duplicates
        const savedTimes = this._OHLCVs.map((candle) => candle[0]);
        const uniqueTimes = [...new Set(savedTimes)];

        // Sorts the unique times by security (prevent duplicates)
        uniqueTimes.sort((a, b) => a - b);

        // New OHLCV array containing only verified unique times
        const tempOHLCV: OHLCV[] = [];

        for (let i = 0; i < uniqueTimes.length; i++) {
            const candle = this._OHLCVs.find((candle) => candle[0] === uniqueTimes[i]);

            if (candle) {
                tempOHLCV[i] = candle;
            }
        }

        // Remove the oldest candles if the limit is reached
        if (tempOHLCV.length > this._ohlcvLimit) {
            tempOHLCV.splice(0, tempOHLCV.length - this._ohlcvLimit);
        }

        // By security, verify that no candle is missing
        if (tempOHLCV.length !== this._ohlcvLimit) {
            return false;
        }

        for (let i = 0; i < tempOHLCV.length - 1; i++) {
            const currentCandleTime = tempOHLCV[i][0];
            const nextCandleTime = tempOHLCV[i + 1][0];

            if (currentCandleTime + this._nbTimeframe !== nextCandleTime) {
                return false;
            }
        }

        // Apply the new OHLCV array
        this._OHLCVs = tempOHLCV;

        return true;
    }

    /**
     * Loads the cache.
     */
    public async load(): Promise<void> {
        this._OHLCVs = await fetchOHLCVs(
            this._exchange,
            this._tradingPair,
            this._timeframe,
            undefined,
            this._ohlcvLimit
        );

        // Convert to price bars
        this._priceBars = convertOHLCVsToPriceBars(this._OHLCVs);
    }

    /**
     * Updates the cache.
     */
    public async update(): Promise<void> {
        const lastCandleTime = this._OHLCVs[this._OHLCVs.length - 1][0];

        const newCandles = await fetchOHLCVs(
            this._exchange,
            this._tradingPair,
            this._timeframe,
            lastCandleTime - this._nbTimeframe,
            this._ohlcvLimit
        );

        // Add raw new candles to the OHLCV array before sorting
        this._OHLCVs.push(...newCandles);

        // Sort the OHLCV candles by time
        const candlesValidated = await this._sortOHLCV();

        // If the candles are not correct, reload the cache
        // Except for the first load (the cache is empty)
        if (!this._firstLoad && !candlesValidated) {
            logger.warn("Invalid OHLCVs, reloading the cache...");

            await this.load();
        }

        // Convert to price bars
        this._priceBars = convertOHLCVsToPriceBars(this._OHLCVs);

        // Set the first load to false
        this._firstLoad = false;
    }

    /**
     * Gets the OHLCV candles.
     * @returns The OHLCV candles.
     */
    public get OHLCVs(): OHLCV[] {
        return this._OHLCVs;
    }

    /**
     * Gets the price bars.
     * @returns The price bars.
     */
    public get priceBars(): NsStrategy.priceBar[] {
        return this._priceBars;
    }
}