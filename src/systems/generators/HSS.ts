import fs from "fs";

import { consoleTable, convertFilenameDateToDate } from "helpers/inputs";
import NsGeneral from "types/general";
import logger from "utils/logger";


/**
 * List all json files in a directory.
 * @param dirPath The path to the directory where to list the json files.
 * @param removeExtension If true, remove the '.json' extension from the file names.
 * @returns The list of json files.
 */
function getJsonFiles(dirPath: string, removeExtension = true) {
    const files = fs.readdirSync(dirPath);
    const jsonFiles: string[] = [];

    for (const file of files) {
        if (file.endsWith(".json")) {
            let filename = file;

            if (removeExtension) {
                filename = file.slice(0, -5);
            }

            jsonFiles.push(filename);
        }
    }

    return jsonFiles;
}

/**
 * Search inside the name of all json files in a directory for a query.
 * @param dirPath The path to the directory to search.
 * @param query The query to search.
 * @param jsonFiles The list of json files (optional, if not provided, run the 'getJsonFiles' function).
 * @returns The files that match the query.
 */
function searchInJsonFiles(
    dirPath: string,
    query: string,
    jsonFiles?: string[]
) {
    const files = jsonFiles ?? getJsonFiles(dirPath);
    const res: string[] = [];

    for (const file of files) {
        if (file.includes(query)) {
            res.push(file);
        }
    }

    return res;
}

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
    const availableData = getJsonFiles(args.dataPath);

    if (args.show) {
        const parsedData = [];

        for (const data of availableData) {
            parsedData.push(
                parseDataFilename(data)
            );
        }

        consoleTable(parsedData);

        return;
    }

    // TODO: if '--help' is passed, print the help message and exit
    // TODO: if '--show' is passed, print the available data and exit

    // TODO: Implement the HSS system


    // Generate the output directory if it doesn't exist (recursively)
    if (!fs.existsSync(args.scorePath)) {
        fs.mkdirSync(args.scorePath, { recursive: true });

        logger.info(`Directory '${args.scorePath}' created.`);
    }
}