import NsStrategy from "types/strategy";


/**
 * Empty I/O storage for HSS strategy run.
 */
const storageStatsObject: NsStrategy.storageStats = {
    // Indexes
    buyIndexes: [],
    sellIndexes: [],

    // Profits
    profitsInBaseCurrency: [],
    profitsInQuoteCurrency: [],

    // Trades
    trades: 0,
    tradesWon: 0,
    tradesLost: 0,
    tradesWonPct: 0,
    tradesLostPct: 0,
};

/**
 * Empty I/O storage for HSS strategy run.
 */
const storageObject: NsStrategy.storage = {
    // Market data
    OHLCVs: [],                 // OHLCV data
    priceBars: [],              // Price bar data

    // Trade & profits
    inPosition: false,          // In or out of position
    targetProfit: 0,            // Target profit
    stopLoss: 0,                // Stop loss
    lastBuyPrice: 0,            // Last buy price

    // Indexes
    index: 0,                   // Index of current price bar

    // Statistics
    stats: storageStatsObject,  // Statistics
};


export default storageObject;