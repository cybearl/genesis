import fs from "fs";

import { getJsonFiles } from "helpers/files";
import { consoleTable, convertFilenameDateToDate, getDateString, searchQueryInFilenames } from "helpers/inputs";
import { scoreHelpMsg } from "scripts/messages/messages";
import NsGeneral from "types/general";
import logger from "utils/logger";


/**
 * Parse the name of a data file to recover the info about the contained data.
 * @param fileName The name of the file.
 * @returns The info about the data contained in the file.
 */
function parseDataFilename(fileName: string) {
    const sep = fileName.split(" ");

    // Format the trading pair as 'BASE/QUOTE'
    const tradingPair = sep[0]
        .split("-")
        .join("/")
        .substring(1, sep[0].length - 1);

    // Timeframe is already in the correct format
    const timeframe = sep[1];

    // Convert start and end dates to Date objects (replace '_' with 'T')
    const startDate = convertFilenameDateToDate(sep[2]);
    const endDate = convertFilenameDateToDate(sep[3]);

    const res = {
        tradingPair,
        timeframe,
        startDate,
        endDate
    };

    return res;
}

/**
 * Main function for the HSS system,
 * generates a score for a strategy based on
 * the historical data of a trading pair.
 *
 * Note: The score is saved as a JSON file
 * inside the 'generators/score' directory.
 * @param args The command line arguments.
 */
export default async function main(
    args: NsGeneral.historicalScoringSystemOptions
) {
    if (args.help) {
        console.log(scoreHelpMsg);
        return;
    }

    const availableDataFilenames = getJsonFiles(args.dataPath);
    const parsedDataFilenames = [];
    const parsedDataForQuery = [];

    for (const availableDataFilename of availableDataFilenames) {
        parsedDataFilenames.push(
            parseDataFilename(availableDataFilename)
        );
    }

    // Format data as strings for the query
    for (const filename of parsedDataFilenames) {
        parsedDataForQuery.push(
            `${
                filename.tradingPair
            } ${
                filename.timeframe
            } ${
                getDateString(filename.startDate)
            } ${
                getDateString(filename.endDate)
            }`
        );
    }

    if (args.show) {
        consoleTable(parsedDataFilenames);
        return;
    }

    // TODO:
    // - Add support for multiple queries (trading pairs, timeframes, start & end dates, etc.)
    // - Add support for multiple strategies (dynamic import with string)
    // - Result should be a JSON file with the score for all or one strategy
    // - The result should be shown in the console too, even if it's basic
    // - The results will be later accessible from the UI

    // Generate the output directory if it doesn't exist (recursively)
    if (!fs.existsSync(args.scorePath)) {
        fs.mkdirSync(args.scorePath, { recursive: true });

        logger.info(`Directory '${args.scorePath}' created.`);
    }
}