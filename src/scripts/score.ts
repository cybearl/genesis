import "configs/env";

import minimist from "minimist";

import { GENERAL_CONFIG } from "configs/global.config";
import score from "systems/generators/HSS";
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
        query: "ALL"
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
        if (args.query) {
            options.query = args.query as string;
        } else {
            logger.warn(`No 'query' parameter provided, defaults to '${options.query}'.`);
        }
    }

    // Calling internal function (renamed from 'main' to 'score')
    await score(options);
}

const args = minimist(process.argv.slice(2));
main(args);

