import "configs/env";
import path from "path";

import minimist from "minimist";

import { GENERAL_CONFIG } from "configs/global.config";
import score from "systems/generators/HSS";
import logger from "utils/logger";



async function main(args: minimist.ParsedArgs) {
    let dir = path.join(__dirname, "..", "json");
    let query = "";


    if (!args.dir) {
        logger.warn("No 'dir' parameter provided, defaults to 'packages/server/src/json'.");
        dir = args.dir as string;
    }

    if (!args.query) {
        logger.warn("No 'query' parameter provided, defaults to ''.");
        query = args.query as string;
    }

    // await searchJsonFiles(dir, query);
}

const args = minimist(process.argv.slice(2));
main(args);

