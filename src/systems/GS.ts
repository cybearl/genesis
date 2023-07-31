import fs from "fs";
import path from "path";

import { OHLCV } from "ccxt";

import {
    checkExchangeStatus,
    fetchOHLCV,
    loadBalances,
    loadExchange,
    loadMarkets,
    parseTradingPair
} from "helpers/exchange";
import { getTimeframe, removeDays } from "helpers/IO";
import { generateRandomName } from "helpers/random";
import { generateHelpMsg } from "scripts/messages/messages";
import NsGeneral from "types/general";
import logger from "utils/logger";


/**
 * Main function for the GS system,
 * generates a JSON file with OHLCV data.
 *
 * Note: applies pagination to the data if the
 * amount of data is too large (> 'args.entriesPerPage' entries).
 * @param args The command line arguments.
 */
export default async function main(
    args: NsGeneral.generatorSystemOptions
) {
    if (args.help) {
        console.log(generateHelpMsg);
        return;
    }

    const tokens = parseTradingPair(args.pair);
    const timeframe = getTimeframe(args.timeframe);
    const now = Date.now();

    // Get the 'since' timestamp in milliseconds
    const sinceDate = removeDays(new Date(), args.since);
    const sinceMs = sinceDate.getTime();

    // Measures number of timeframes with 'since' as the start
    // and the current time as the end
    const timeframes = Math.floor((now - sinceMs) / timeframe);

    // If the amount of timeframes is too large (> 'args.entriesPerPage' entries),
    // apply pagination to the data
    const pagination = timeframes > args.entriesPerPage ? Math.ceil(timeframes / args.entriesPerPage) : 1;

    // Connect to API
    const exchange = loadExchange(true);
    await checkExchangeStatus(exchange);
    await loadMarkets(exchange);

    // Verify tokens availability
    const balances = await loadBalances(exchange);

    if (!balances[tokens.base]) {
        logger.error(`Token ${tokens.base} is not available.`);
        return;
    }

    if (!balances[tokens.quote]) {
        logger.error(`Token ${tokens.quote} is not available.`);
        return;
    }

    // Get OHLCV data
    const OHLCVs: OHLCV[] = [];

    for (let i = 0; i < pagination; i++) {
        const since = sinceMs + (i * timeframe * args.entriesPerPage);

        logger.info(`Fetching page No.${i + 1}...`);

        const OHLCV = await fetchOHLCV(
            exchange,
            args.pair,
            args.timeframe,
            since,
            args.entriesPerPage
        );

        OHLCVs.push(...OHLCV);
    }

    // Generate the output directory if it doesn't exist (recursively)
    if (!fs.existsSync(args.dataPath)) {
        fs.mkdirSync(args.dataPath, { recursive: true });

        logger.info(`Directory '${args.dataPath}' created.`);
    }

    // Format the file name
    const rndName = generateRandomName();
    const fileBaseName = `(${tokens.base}-${tokens.quote}) ${rndName.toUpperCase()} ${args.timeframe}`;
    const filename = `${fileBaseName} ${sinceDate.getTime()} ${Date.now()}.json`;

    // Save OHLCV data to JSON file
    fs.writeFileSync(
        path.join(args.dataPath, filename),
        JSON.stringify(OHLCVs, null, 4)
    );
}