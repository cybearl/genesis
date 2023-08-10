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
     * Storage statistics.
     */
    interface storageStats {
        buyIndexes: number[];
        sellIndexes: number[];

        profitsInBaseCurrency: number[];
        profitsInQuoteCurrency: number[];

        trades: number;
        tradesWon: number;
        tradesLost: number;
        tradesWonPct: number;
        tradesLostPct: number;
    }

    /**
     * Standard strategy I/O storage.
     */
    interface storage {
        OHLCVs: OHLCV[];
        priceBars: priceBar[];

        inPosition: boolean;
        targetProfit: number;
        stopLoss: number;
        lastBuyPrice: number;

        index: number;

        stats: storageStats;
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