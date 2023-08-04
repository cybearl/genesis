import NsStrategy from "types/strategy";


/**
 * Empty I/O storage for initial strategy run.
 */
const storageObject: NsStrategy.storage = {
    inPosition: false,          // In or out of position
    rawProfits: []              // Raw profit numbers
};


export default storageObject;