import "configs/env.config";

import minimist from "minimist";

import { GENERAL_CONFIG } from "configs/global.config";
import { getDuration } from "helpers/local/IO";
import generator from "systems/GS";
import NsGeneral from "types/general";
import logger from "utils/logger";


/**
 * Runs the GS main function with the command line arguments parsed.
 * @param args Arguments passed from the command line.
 */
async function main(args: minimist.ParsedArgs) {
    logger.info("Generator System (GS) - Main function");

    const options: NsGeneral.generatorSystemOptions = {
        help: false,
        dataPath: GENERAL_CONFIG.dataPath,
        tradingPair: "BNB/USDT",
        timeframe: "1m",
        duration: 1 * 60 * 60 * 1000,
        entriesPerPage: 512
    };

    // Help
    if (args.help) {
        options.help = true;
    }

    const log = (keyName: string, defaultValue: unknown) => {
        logger.warn(`No '${keyName}' parameter provided, defaulting to '${defaultValue}'.`);
    };

    // NOTE:
    //  Skipping path -> fixed value to 'GENERAL_CONFIG.dataPath'

    // Disable parameters if '--help' is passed
    if (!options.help) {
        if (args.tradingPair) {
            if (!args.tradingPair.includes("/")) {
                logger.error(`Invalid trading pair '${args.tradingPair}'.`);
                logger.error("The trading pair must be in the format of 'BASE/QUOTE'.");
                return;
            }

            options.tradingPair = args.tradingPair as string;
        } else {
            log("tradingPair", options.tradingPair);
        }

        if (args.timeframe) {
            const validTimeframes = [
                "1s", "30s", "1m", "3m",
                "5m", "15m", "30m", "1h",
                "2h", "4h", "1d"
            ];

            if (!validTimeframes.includes(args.timeframe as string)) {
                logger.error(`Invalid timeframe format '${args.timeframe}'.`);
                logger.error(`Valid timeframes: ${validTimeframes.join(", ")}.`);
                return;
            }

            options.timeframe = args.timeframe as NsGeneral.IsTimeframe;
        } else {
            log("timeframe", options.timeframe);
        }

        if (args.duration) {
            const durationFromArg = getDuration(args.duration);

            if (durationFromArg) {
                options.duration = durationFromArg;
            } else {
                logger.error(`Invalid duration: ${args.duration}`);
                logger.warn("Defaulting duration to '1h'.");
            }
        } else {
            log("duration", "1h");
        }

        // Entries per page
        if (args.entriesPerPage) {
            if (
                !Number.isInteger(args.entriesPerPage as number) ||
                (Number.isInteger(args.entriesPerPage as number) && args.entriesPerPage <= 0)
            ) {
                logger.error(`Invalid 'entriesPerPage' parameter '${args.entriesPerPage}'.`);
                logger.error("The 'entriesPerPage' parameter must be an integer greater than 0.");
                return;
            }

            if (args.entriesPerPage > 512) {
                logger.warn("'entriesPerPage' parameter exceeds the maximum value of 512, setting it to 512.");
                args.entriesPerPage = 512;
            }

            options.entriesPerPage = args.entriesPerPage as number;
        } else {
            log("entriesPerPage", options.entriesPerPage);
        }
    }

    // Calling internal function (renamed from 'main' to 'generator')
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