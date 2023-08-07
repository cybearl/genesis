import "configs/env.config";

import minimist from "minimist";

import { GENERAL_CONFIG } from "configs/global.config";
import score from "systems/HSS";
import NsGeneral from "types/general";
import logger from "utils/logger";


/**
 * Runs the HSS main function with the command line arguments parsed.
 * @param --help Shows the help message.
 * @param --show Shows the available data for the HSS with a query.
 */
async function main(args: minimist.ParsedArgs) {
    logger.info("Historical Scoring System (HSS) - Main function");

    const options: NsGeneral.historicalScoringSystemOptions = {
        help: false,
        show: false,
        dataPath: GENERAL_CONFIG.dataPath,
        scorePath: GENERAL_CONFIG.scorePath,
        name: undefined,
        tradingPair: undefined,
        base: undefined,
        quote: undefined,
        timeframe: undefined,
        minDuration: undefined
    };

    if (args.help) {
        options.help = true;
    }

    if (args.show) {
        options.show = true;
    }

    // NOTE:
    //  Skipping paths -> fixed value to 'GENERAL_CONFIG.scorePath' & 'GENERAL_CONFIG.dataPath'

    // Disable parameters if '--help' / 'show' is passed
    if (!options.help) {
        if (args.name) {
            options.name = args.name as string;
        } else {
            logger.warn("No 'name' parameter provided, defaults to 'ALL'.");
        }

        if (args.tradingPair) {
            options.tradingPair = args.tradingPair as string;
        } else {
            logger.warn("No 'tradingPair' parameter provided, defaults to 'ALL'.");
        }

        if (args.base) {
            options.base = args.base as string;
        } else {
            logger.warn("No 'base' parameter provided, defaults to 'ALL'.");
        }

        if (args.quote) {
            options.quote = args.quote as string;
        } else {
            logger.warn("No 'quote' parameter provided, defaults to 'ALL'.");
        }

        if (args.timeframe) {
            options.timeframe = args.timeframe as NsGeneral.IsTimeframe;
        } else {
            logger.warn("No 'timeframe' parameter provided, defaults to 'ALL'.");
        }

        if (args.minDuration) {
            options.minDuration = args.minDuration as number;
        } else {
            logger.warn("No 'minDuration' parameter provided, defaults to 'ALL'.");
        }
    }

    // Calling internal function (renamed from 'main' to 'score')
    await score(options);
}

const args = minimist(process.argv.slice(2));
main(args);

