import { OHLCV } from "ccxt";
import lodash from "lodash";

import storageObject from "objects/storageObject";
import * as strategies from "strategies/src/utils/exports";
import NsStrategy from "types/strategy";
import logger from "utils/logger";


// Strategy Pool (SP)
export default class StrategyPool {
    private _strategyNames: string[] = [];
    private _strategies: NsStrategy.strategies = {};
    private _storages: NsStrategy.storages = {};
    private _indexes: { [key: string]: number } = {};


    /**
     * Links the strategies to the strategy pool
     * and assigns storages to the strategies.
     */
    constructor() {
        // Get strategy names
        this._strategyNames = Object.keys(strategies);

        // Assign strategies
        this._strategies = strategies as unknown as NsStrategy.strategies;

        // Assign storages (deep copies)
        for (const strategyName of Object.keys(strategies)) {
            this._storages[strategyName] = lodash.cloneDeep(storageObject);
        }

        logger.info(`Strategy pool initialized with ${this._strategyNames.length} ${this._strategyNames.length > 1 ? "strategies" : "strategy"}.`);
    }

    /**
     * Get a list of all strategy names.
     * @returns List of all strategy names.
     */
    public getStrategyNames() {
        return this._strategyNames;
    }

    /**
     * Returns the stats of all strategies.
     * @returns Stats of all strategies.
     */
    public getStats() {
        const stats: { [key: string]: NsStrategy.storageStats } = {};

        for (const strategyName of this._strategyNames) {
            stats[strategyName] = this._storages[strategyName].stats;
        }

        return stats;
    }

    /**
     * Deletes all market data from storages.
     */
    public deleteMarketData() {
        for (const strategyName of this._strategyNames) {
            this._storages[strategyName].OHLCVs = [];
            this._storages[strategyName].priceBars = [];
        }
    }

    /**
     * Resets all storages.
     */
    public resetStorages() {
        for (const strategyName of this._strategyNames) {
            this._storages[strategyName] = lodash.cloneDeep(storageObject);
        }
    }

    /**
     * Main function of the strategy pool.
     * Updates storages with last data and
     * runs all strategy functions.
     */
    public run(OHLCVs: OHLCV[], priceBars: NsStrategy.priceBar[]) {
        for (const strategyName of this._strategyNames) {
            // Check if index exists for strategy
            if (!this._indexes[strategyName]) {
                this._indexes[strategyName] = 0;
            }

            // Update storages
            this._storages[strategyName].OHLCVs = OHLCVs;
            this._storages[strategyName].priceBars = priceBars;

            // Apply index to storage
            this._storages[strategyName].index = this._indexes[strategyName];

            // Get strategy function
            const strategyFunction = this._strategies[strategyName];

            // Run strategy function
            this._storages[strategyName] = strategyFunction(
                this._storages[strategyName]
            );

            // Update indexes
            this._indexes[strategyName]++;
        }
    }
}