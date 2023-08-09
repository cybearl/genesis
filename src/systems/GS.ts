import fs from "fs";
import path from "path";

import { OHLCV } from "ccxt";

import { generateHelpMsg } from "configs/messages.config";
import { getTimeframe } from "helpers/local/IO";
import { generateRandomName } from "helpers/local/random";
import {
    checkExchangeStatus,
    fetchOHLCVs,
    loadExchange,
    loadMarkets,
    parseTradingPair
} from "helpers/online/exchange";
import NsGeneral from "types/general";
import logger from "utils/logger";


/**
 * Main function for the GS system,
 * generates a JSON file with OHLCV data.
 *
 * Note: applies pagination to the data if the
 * amount of data is too large (> 'options.entriesPerPage' entries).
 * @param options The parsed command line arguments.
 */
export default async function main(
    options: NsGeneral.generatorSystemOptions
) {
    if (options.help) {
        console.log(generateHelpMsg);
        return;
    }

    const tokens = parseTradingPair(options.tradingPair);
    const timeframe = getTimeframe(options.timeframe);
    const now = Date.now();

    // // Get the 'duration' timestamp in milliseconds
    const durationDate = new Date(now - options.duration);
    const durationMs = durationDate.getTime();

    // Measures number of timeframes with 'duration' as the start
    // and the current time as the end
    const timeframes = Math.floor((now - durationMs) / timeframe);

    // If the amount of timeframes is too large (> 'options.entriesPerPage' entries),
    // apply pagination to the data
    const pagination = timeframes > options.entriesPerPage ? Math.ceil(timeframes / options.entriesPerPage) : 1;

    // Connect to API
    const exchange = loadExchange(true);
    await checkExchangeStatus(exchange);
    await loadMarkets(exchange);

    // Get OHLCV data
    const OHLCVs: OHLCV[] = [];

    for (let i = 0; i < pagination; i++) {
        const duration = durationMs + (i * timeframe * options.entriesPerPage);

        logger.info(`Fetching page No.${i + 1}...`);

        const fetchedOHLCVs = await fetchOHLCVs(
            exchange,
            options.tradingPair,
            options.timeframe,
            duration,
            options.entriesPerPage
        );

        OHLCVs.push(...fetchedOHLCVs);
    }

    // Generate the output directory if it doesn't exist (recursively)
    if (!fs.existsSync(options.dataPath)) {
        fs.mkdirSync(options.dataPath, { recursive: true });

        logger.info(`Directory '${options.dataPath}' created.`);
    }

    // Format the file name
    const rndName = generateRandomName();
    const fileBaseName = `(${tokens.base}-${tokens.quote}) ${rndName.toUpperCase()} ${options.timeframe}`;
    const filename = `${fileBaseName} ${durationMs} ${Date.now()}.json`;

    // Save OHLCV data to JSON file
    fs.writeFileSync(
        path.join(options.dataPath, filename),
        JSON.stringify(OHLCVs, null, 4)
    );
}