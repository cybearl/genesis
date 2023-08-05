import NsStrategy from "types/strategy";


/**
 * Empty I/O storage for initial strategy run.
 */
const storageObject: NsStrategy.storage = {
    // Market data
    OHLCVs: [],                 // OHLCV data
    priceBars: [],              // Price bar data

    // Trade & profits
    inPosition: false,          // In or out of position
    rawProfits: [],             // Raw profit numbers
    targetProfit: 0,            // Target profit
    stopLoss: 0,                // Stop loss
    lastBuyPrice: 0,            // Last buy price

    // Indexes
    index: 0                    // Index of current price bar
};


export default storageObject;