import "configs/env";

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
        tradingPair: undefined,
        timeframe: undefined,
        startDate: undefined,
        endDate: undefined
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
    if (!options.help && !options.show) {
        if (args.tradingPair) {
            options.tradingPair = args.tradingPair as string;
        } else {
            logger.warn("No 'tradingPair' parameter provided, defaults to 'ALL'.");
        }

        if (args.timeframe) {
            options.timeframe = args.timeframe as NsGeneral.IsTimeframe;
        } else {
            logger.warn("No 'timeframe' parameter provided, defaults to 'ALL'.");
        }

        if (args.startDate) {
            options.startDate = args.startDate as number;
        } else {
            logger.warn("No 'startDate' parameter provided, defaults to 'ALL'.");
        }

        if (args.endDate) {
            options.endDate = args.endDate as number;
        } else {
            logger.warn("No 'endDate' parameter provided, defaults to 'ALL'.");
        }
    }

    // Calling internal function (renamed from 'main' to 'score')
    await score(options);
}

const args = minimist(process.argv.slice(2));
main(args);

