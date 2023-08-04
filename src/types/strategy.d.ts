import { OHLCV } from "ccxt";


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
     * Standard strategy I/O storage.
     */
    interface storage {
        OHLCVs: OHLCV[];
        priceBars: priceBar[];
        inPosition: boolean;
        rawProfits: number[];
    }

    /**
     * Storages for the strategies.
     * One storage assigned per strategy.
     */
    interface storages {
        [key: string]: storage;
    }

    /**
     * Type containing strategy function.
     */
    type strategy = (storage: storage) => storage;

    /**
     * Interface for a "* as" strategies import.
     */
    interface strategies {
        [key: string]: strategy;
    }
}


export default NsStrategy;