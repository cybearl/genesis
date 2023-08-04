import lodash from "lodash";

import { GENERAL_CONFIG } from "configs/global.config";
import { getFiles } from "helpers/local/files";
import storageObject from "objects/storageObject";
import * as strategies from "strategies/src/utils/exports";
import NsStrategy from "types/strategy";


// Strategy Pool (SP) (HSS Weighted Governance)
export default class StrategyPool {
    private _storage = lodash.cloneDeep(storageObject);
    private _strategies: NsStrategy.strategy[] = [];


    /**
     * Constructor.
     */
    constructor() {
        //
    }

    public run() {
        for (const strategyName of Object.keys(strategies)) {
            // Linking the strategy interface to the strategy function
            this._strategies.push(
                (strategies as unknown as NsStrategy.strategies)[strategyName]
            );
        }
    }
}