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
 * @returns The files that match the query.
 */
function searchJsonFiles(dirPath: string, query: string) {
    const files = getJsonFiles(dirPath);
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
 * Note: generates a result json file for each
 * strategy in the 'strategies' directory.
 * @param args The command line arguments.
 */
export default function main(
    args: NsGeneral.historicalScoringSystemOptions
) {
    if (!fs.existsSync(args.path)) {
        logger.error(`Path ${args.path} does not exist.`);
        return;
    }
}