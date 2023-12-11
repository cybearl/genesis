import "configs/env.config";

import minimist from "minimist";

import { GENERAL_CONFIG } from "configs/global.config";
import { getDuration } from "helpers/local/IO";
import score from "systems/HSS";
import NsGeneral from "types/general";
import logger from "utils/logger";


/**
 * Runs the HSS main function with the command line arguments parsed.
 * @param args Arguments passed from the command line.
 */
async function main(args: minimist.ParsedArgs) {
    logger.info("Historical Scoring System (HSS) - Main function");

    const options: NsGeneral.historicalScoringSystemOptions = {
        help: false,
        showAll: false,
        show: false,
        dataPath: GENERAL_CONFIG.dataPath,
        scorePath: GENERAL_CONFIG.scorePath,
        name: undefined,
        tradingPair: undefined,
        base: undefined,
        quote: undefined,
        timeframe: undefined,
        minDuration: 1 * 60 * 60 * 1000
    };

    if (args.help) {
        options.help = true;
    }

    if (args.showAll) {
        options.showAll = true;
    }

    if (args.show) {
        options.show = true;
    }

    const log = (entry: string) => {
        if (!options.showAll && !options.show) {
            logger.warn(`No '${entry}' parameter provided, defaulting to 'ALL'.`);
        }
    };

    // NOTE:
    //  Skipping paths -> fixed value to 'GENERAL_CONFIG.scorePath' & 'GENERAL_CONFIG.dataPath'

    // Disable parameters if '--help' is passed
    if (!options.help) {
        if (args.name) {
            options.name = args.name as string;
        } else {
            log("name");
        }

        if (args.tradingPair) {
            options.tradingPair = args.tradingPair as string;
        } else {
            log("tradingPair");
        }

        if (args.base) {
            options.base = args.base as string;
        } else {
            log("base");
        }

        if (args.quote) {
            options.quote = args.quote as string;
        } else {
            log("quote");
        }

        if (args.timeframe) {
            options.timeframe = args.timeframe as NsGeneral.IsTimeframe;
        } else {
            log("timeframe");
        }

        if (args.minDuration) {
            const durationFromArg = getDuration(args.minDuration);

            if (durationFromArg) {
                options.minDuration = durationFromArg;
            } else {
                logger.error(`Invalid duration: ${args.minDuration}`);
                logger.warn("Defaulting duration to '1h'.");
            }
        } else {
            log("minDuration");
        }
    }

    // Calling internal function (renamed from 'main' to 'score')
    await score(options);
}

const args = minimist(process.argv.slice(2));
main(args);

