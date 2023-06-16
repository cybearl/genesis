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
    const options: NsGeneral.historicalScoringSystemOptions = {
        help: false,
        show: false,
        path: GENERAL_CONFIG.scorePath,
        query: "ALL"
    };

    if (args.help) {
        options.help = true;
    }

    if (args.show) {
        options.show = true;
    }

    // NOTE:
    //  Skipping path -> fixed value to 'GENERAL_CONFIG.scorePath'

    // Disable parameters if '--help'
    if (!options.help) {
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

