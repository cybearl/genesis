import { OHLCV } from "ccxt";

import NsStrategy from "types/strategy";


/**
 * Converts an OHLCV array to a priceBar object.
 * @param ohlcv The original OHLCV array.
 * @returns The priceBar object.
 */
function convertOHLCVToPriceBar(ohlcv: OHLCV) {
    const [timestamp, open, high, low, close, volume] = ohlcv;

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
 * @param ohlcvList The original list of OHLCV arrays.
 * @returns The list of priceBar objects.
 */
export function convertOHLCVsToPriceBars(ohlcvList: OHLCV[]): NsStrategy.priceBar[] {
    return ohlcvList.map((ohlcv, index) => {
        const priceBar = convertOHLCVToPriceBar(ohlcv);

        // Get the previous OHLCV array
        const prevOHLCV = ohlcvList[index - 1];

        // Additional values
        let pctChange: number | null = null;    // Equivalent to Pandas pct_change() method.

        // Calculate the percentage change between the current and previous close prices
        if (prevOHLCV) {
            const prevPriceBar = convertOHLCVToPriceBar(prevOHLCV);
            pctChange = ((priceBar.close - prevPriceBar.close) / prevPriceBar.close);

            // Round to 8 decimal places
            pctChange = Math.round(pctChange * 1e8) / 1e8;
        }

        return {
            ...priceBar,
            pctChange,
            price: priceBar.close  // Forward looking bias
        };
    });
}