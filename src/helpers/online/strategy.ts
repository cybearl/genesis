import { OHLCV as tOHLCV } from "ccxt";

import NsStrategy from "types/strategy";


/**
 * Converts an OHLCV array to a priceBar object.
 * @param OHLCV The original OHLCV array.
 * @returns The priceBar object.
 */
function convertOHLCVToPriceBar(OHLCV: tOHLCV) {
    const [timestamp, open, high, low, close, volume] = OHLCV;

    return {
        timestamp,
        open,
        high,
        low,
        close,
        volume
    };
}

/**
 * Converts a list of OHLCV arrays to a list of priceBar objects.
 * @param OHLCVs The original list of OHLCVs.
 * @returns The list of priceBar objects.
 */
export function convertOHLCVsToPriceBars(OHLCVs: tOHLCV[]): NsStrategy.priceBar[] {
    return OHLCVs.map((OHLCV, index) => {
        const priceBar = convertOHLCVToPriceBar(OHLCV);

        // Previous & next OHLCV
        const prevOHLCV = OHLCVs[index - 1];
        const nextOHLCV = OHLCVs[index + 1];

        // Additional values
        let pctChange: number | null = null;    // Equivalent to Pandas pct_change() method.
        let forwardLookingBias: number | null = null;    // Open price of the next candle.

        // Calculate the percentage change between the current and previous close prices
        if (prevOHLCV) {
            const prevPriceBar = convertOHLCVToPriceBar(prevOHLCV);
            pctChange = ((priceBar.close - prevPriceBar.close) / prevPriceBar.close);

            // Round to 4 decimal places
            pctChange = Math.round(pctChange * 1e4) / 1e4;
        }

        // Calculate the forward looking bias
        if (nextOHLCV) {
            const nextPriceBar = convertOHLCVToPriceBar(nextOHLCV);
            forwardLookingBias = nextPriceBar.open;
        }

        return {
            ...priceBar,
            pctChange,
            forwardLookingBias
        };
    });
}