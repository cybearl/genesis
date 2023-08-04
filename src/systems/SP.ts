import lodash from "lodash";

import { GENERAL_CONFIG } from "configs/global.config";
import { getFiles } from "helpers/local/files";
import storageObject from "objects/storageObject";
import * as strategies from "strategies/src/utils/exports";
import NsStrategy from "types/strategy";


// Strategy Pool (SP) (HSS Weighted Governance)
export default class StrategyPool {
    private _storage = lodash.cloneDeep(storageObject);
    private _availableStrategyNames: string[] = [];
    private _allStrategyFunctions: NsStrategy.strategy[] = [];


    /**
     * Constructor.
     */
    constructor() {
        // Get the list of available strategies
        this._availableStrategyNames = Object.keys(strategies);
    }

    public run() {
        for (const strategyName of this._availableStrategyNames) {
            // Linking the strategy interface to the strategy function
            const strategy = (strategies as unknown as NsStrategy.strategies)[
                strategyName
            ];

            this._allStrategyFunctions.push(strategy);
        }
    }
}