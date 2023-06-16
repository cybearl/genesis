import fs from "fs";

import NsGeneral from "types/general";
import logger from "utils/logger";


/**
 * List all json files in a directory.
 * @param dirPath The path to the directory where to list the json files.
 * @returns The list of json files.
 */
function getJsonFiles(dirPath: string) {
    const files = fs.readdirSync(dirPath);
    const jsonFiles: string[] = [];

    for (const file of files) {
        if (file.endsWith(".json")) {
            jsonFiles.push(file);
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
    // TODO: if '--help' is passed, print the help message and exit
    // TODO: if '--show' is passed, print the available data and exit

    // TODO: Implement the HSS system


    // Generate the output directory if it doesn't exist (recursively)
    if (!fs.existsSync(args.path)) {
        fs.mkdirSync(args.path, { recursive: true });

        logger.info(`Directory '${args.path}' created.`);
    }
}