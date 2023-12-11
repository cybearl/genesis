import { OHLCV as tOHLCV } from "ccxt";

import { roundTo8 } from "helpers/local/maths";
import NsStrategy from "types/strategy";


/**
 * Empty price bar object.
 */
const emptyPriceBar: NsStrategy.priceBar = {
    timestamp: 0,
    open: 0,
    high: 0,
    low: 0,
    close: 0,
    volume: 0,
    up: null,
    down: null,

    SMA: null,
    EMA: null,
    WMA: null,
    SMMA: null,

    pctChange: null,
    lookAheadBias: null,
    relativeStrengthIndex: null
};

/**
 * Converts an OHLCV array to an object.
 * @param OHLCV The original OHLCV array.
 * @returns The object.
 */
function convertOHLCVToObject(OHLCV?: tOHLCV) {
    if (!OHLCV) return null;

    const [timestamp, open, high, low, close, volume] = OHLCV;
    return { timestamp, open, high, low, close, volume };
}

/**
 * Converts a list of OHLCV arrays to a list of priceBar objects.
 * @param OHLCVs The original list of OHLCVs.
 * @returns The list of priceBar objects.
 */
export function convertOHLCVsToPriceBars(OHLCVs: tOHLCV[]) {
    return OHLCVs.map((OHLCV, index) => {
        // Previous OHLCV
        let prevPriceBar: NsStrategy.priceBar | null = null;

        if (OHLCVs[index - 1]) prevPriceBar = {
            ...emptyPriceBar,
            ...convertOHLCVToObject(OHLCVs[index - 1])
        };

        // Current OHLCV
        const priceBar: NsStrategy.priceBar = {
            ...emptyPriceBar,
            ...convertOHLCVToObject(OHLCV)
        };

        // Next OHLCV
        let nextPriceBar: NsStrategy.priceBar | null = null;

        if (OHLCVs[index + 1]) nextPriceBar = {
            ...emptyPriceBar,
            ...convertOHLCVToObject(OHLCVs[index + 1])
        };

        if (prevPriceBar) {
            // Up & down periods
            const change = roundTo8(priceBar.close - prevPriceBar.close);
            priceBar.up = change > 0 ? change : 0;
            priceBar.down = change < 0 ? Math.abs(change) : 0;

            // Simple moving average (SMA)
            if (!prevPriceBar.SMA) prevPriceBar.SMA = prevPriceBar.close;
            priceBar.SMA = roundTo8(prevPriceBar.SMA + (priceBar.close - prevPriceBar.close) / 2);

            // Percentage change (Pandas pct_change() method)
            priceBar.pctChange = roundTo8((priceBar.close - prevPriceBar.close) / prevPriceBar.close);
        }

        // Look-ahead bias
        if (nextPriceBar) {
            priceBar.lookAheadBias = nextPriceBar.open;
        }

        return priceBar;
    });
}