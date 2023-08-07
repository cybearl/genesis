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
        showFiltered: false,
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

    if (args.showFiltered) {
        options.showFiltered = true;
    }

    const log = (keyName: string) => {
        if (!options.show && !options.showFiltered) {
            logger.warn(`No '${keyName}' parameter provided, defaults to 'ALL'.`);
        }
    };

    // NOTE:
    //  Skipping paths -> fixed value to 'GENERAL_CONFIG.scorePath' & 'GENERAL_CONFIG.dataPath'

    // Disable parameters if '--help' / 'show' is passed
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
            options.minDuration = args.minDuration as number;
        } else {
            log("minDuration");
        }
    }

    // Calling internal function (renamed from 'main' to 'score')
    await score(options);
}

const args = minimist(process.argv.slice(2));
main(args);

