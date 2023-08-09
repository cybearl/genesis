import { OHLCV } from "ccxt";
import lodash from "lodash";

import storageObject from "objects/storageObject";
import * as strategies from "strategies/src/utils/exports";
import NsStrategy from "types/strategy";
import logger from "utils/logger";


// Strategy Pool (SP) (HSS Weighted Governance)
export default class StrategyPool {
    private _strategyNames: string[] = [];
    private _strategies: NsStrategy.strategies = {};
    private _storages: NsStrategy.storages = {};


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

        logger.verbose(`Strategy pool initialized with ${this._strategyNames.length} ${this._strategyNames.length > 1 ? "strategies" : "strategy"}.`);
    }

    /**
     * Get a list of all strategy names.
     * @returns List of all strategy names.
     */
    public getStrategyNames() {
        return this._strategyNames;
    }

    /**
     * Returns the raw profits of all strategies.
     * @returns Raw profits of all strategies.
     */
    public getRawProfits() {
        const profits: { [key: string]: number[]; } = {};

        for (const strategyName of this._strategyNames) {
            profits[strategyName] = this._storages[strategyName].rawProfits;
        }

        return profits;
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
     * Main function of the strategy pool.
     * Updates storages with last data and
     * runs all strategy functions.
     */
    public run(
        OHLCVs: OHLCV[],
        priceBars: NsStrategy.priceBar[],
    ) {
        for (const strategyName of this._strategyNames) {
            // Update storages
            this._storages[strategyName].OHLCVs = OHLCVs;
            this._storages[strategyName].priceBars = priceBars;

            // Run strategy
            const strategyFunction = this._strategies[strategyName];

            this._storages[strategyName] = strategyFunction(
                this._storages[strategyName]
            );
        }
    }
}