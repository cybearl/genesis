import "configs/env";

import minimist from "minimist";

import { GENERAL_CONFIG } from "configs/global.config";
import generator from "systems/generators/GS";
import NsGeneral from "types/general";
import logger from "utils/logger";


/**
 * Runs the GS main function with the command line arguments parsed.
 * @param --path The directory path to save the generated data to.
 * @param --pair The trading pair to generate the data for.
 * @param --timeframe The timeframe to generate the data for.
 * @param --since Timestamp to start generating the data from,
 * represented as the amount of days before the current time.
 * @param --entriesPerPage The amount of entries per page.
 */
async function main(args: minimist.ParsedArgs) {
    const options: NsGeneral.generatorSystemOptions = {
        path: GENERAL_CONFIG.dataPath,
        pair: "BNB/USDT",
        timeframe: "1m",
        since: 1,
        entriesPerPage: 512
    };

    // NOTE:
    //  Skipping path -> fixed value to 'src/json'

    if (args.pair) {
        if (!args.pair.includes("/")) {
            logger.error(`Invalid trading pair '${args.pair}'.`);
            return;
        }

        options.pair = args.pair as string;
    } else {
        logger.warn("No 'pair' parameter provided, defaults to BNB/USDT.");
    }

    if (args.timeframe) {
        const validTimeframes = [
            "1s", "30s", "1m", "3m",
            "5m", "15m", "30m", "1h",
            "2h", "4h", "1d"
        ];

        if (!validTimeframes.includes(args.timeframe as string)) {
            logger.error(`Invalid timeframe '${args.timeframe}'.`);
            return;
        }

        options.timeframe = args.timeframe as NsGeneral.IsTimeframe;
    } else {
        logger.warn("No 'timeframe' parameter provided, defaults to 1 minute.");
    }

    if (args.since) {
        if (!Number.isInteger(args.since as number) && args.since <= 0) {
            logger.error(`Invalid 'since' parameter '${args.since}'.`);
            return;
        }

        options.since = args.since as number;
    } else {
        logger.warn("No 'since' parameter provided, defaults to 8 days.");
    }

    if (args.entriesPerPage) {
        if (!Number.isInteger(args.entriesPerPage as number) && args.entriesPerPage <= 0) {
            logger.error(`Invalid 'entriesPerPage' parameter '${args.entriesPerPage}'.`);
            return;
        }

        if (args.entriesPerPage > 512) {
            logger.warn("'entriesPerPage' parameter exceeds the maximum value of 512, setting it to 512.");
            args.entriesPerPage = 512;
        }

        options.entriesPerPage = args.entriesPerPage as number;
    } else {
        logger.warn("No 'entriesPerPage' parameter provided, defaults to 512.");
    }

    await generator(options);
}

const args = minimist(process.argv.slice(2));
main(args)
    .then(() => {
        process.exit(0);
    }).catch((error) => {
        logger.error(error);
        process.exit(1);
    });