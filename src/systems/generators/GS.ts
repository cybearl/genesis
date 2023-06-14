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
import { getCurrentDateString, getDateString, getTimeframe, removeDays } from "helpers/inputs";
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

    // Save OHLCV data to JSON file
    if (!fs.existsSync(args.path)) {
        fs.mkdirSync(args.path, { recursive: true });
    }

    // Format the file name
    const fileBaseName = `(${tokens.base}-${tokens.quote}) ${args.timeframe}`;
    const formattedSinceDate = getDateString(sinceDate, "YYYY-MM-DD");
    const formattedNowDate = getCurrentDateString("YYYY-MM-DD");
    const fileName = `${fileBaseName} ${formattedSinceDate} ${formattedNowDate}.json`;

    fs.writeFileSync(
        path.join(args.path, fileName),
        JSON.stringify(OHLCVs, null, 4)
    );
}