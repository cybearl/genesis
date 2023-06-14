import path from "path";

/**
 * General configuration.
 */
export const GENERAL_CONFIG = {
    verbose: false,                                                            // Set the winston logger to verbose mode
    timeframeFactorForGeneralLoop: 4,                                          // Timeframe factor for the general loop (x4 by default)
    dateFormat: "YYYY-MM-DD HH:mm:ss",                                         // Date format
    dataPath: path.join(__dirname, "..", "systems", "generators", "data"),     // Path to the data directory
    scorePath: path.join(__dirname, "..", "systems", "generators", "scores"),  // Path to the scores directory
};

/**
 * Network configuration.
 */
export const NETWORK_CONFIG = {
    checkNetwork: true,                             // Check network reliability
    checkNetworkInterval: 1000 * 60 * 60 * 24,      // 1 day
    jitterLimit: 5,                                 // ms
    latencyLimit: 100,                              // ms
    downloadLimit: 1,                               // Mo/s
    uploadLimit: 1,                                 // Mo/s

    // List of MongoDB collections
    botObjectsCollection: "bot_objects"             // Collection for the bot objects
};

/**
 * Exchange configuration.
 */
export const EXCHANGE_CONFIG = {
    sandboxTradingPair: "BNB/BUSD",                         // The trading pair to use in sandbox mode
    sandboxApiKey: process.env.BINANCE_SANDBOX_API_KEY,     // The API key to use in sandbox mode
    sandboxApiSecret: process.env.BINANCE_SANDBOX_API_SEC,  // The API secret to use in sandbox mode
    apiKey: process.env.BINANCE_API_KEY,                    // The API key to use in production mode
    apiSecret: process.env.BINANCE_API_SEC                  // The API secret to use in production mode
};