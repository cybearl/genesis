import lodash from "lodash";

import storageObject from "objects/storageObject";
import NsStrategy from "types/strategy";


// Strategy Pool (SP) (HSS Weighted Governance)
export default class StrategyPool {
    private _storage = lodash.cloneDeep(storageObject);
    private _strategyStorage = [];


    /**
     * Creates a new SP and initializes the storage
     * while dynamically importing the strategies.
     */
    constructor() {
        //
    }

}