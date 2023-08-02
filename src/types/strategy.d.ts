declare namespace NsStrategy {
    /**
     * Interface for a price bar (converted from OHLCV data array).
     */
    interface priceBar {
        timestamp: number;
        open: number;
        high: number;
        low: number;
        close: number;
        volume: number;
        pctChange: number | null;
        forwardLookingBias: number | null;
    }

    /**
     * Standard strategy input.
     */
    interface input {
        symbol: string;
    }

    /**
     * Standard strategy output.
     */
    interface output {
        symbol: string;
    }
}


export default NsStrategy;