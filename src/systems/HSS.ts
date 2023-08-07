import fs from "fs";

import { getFiles } from "helpers/local/files";
import { consoleTable, parseDataFilename } from "helpers/local/IO";
import { parseTradingPair } from "helpers/online/exchange";
import { scoreHelpMsg } from "scripts/messages/messages";
import NsGeneral from "types/general";
import logger from "utils/logger";


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

    const availableDataFilenames = getFiles(args.dataPath, ".json");
    const parsedDataFilenames = [];
    const parsedDataForQuery: NsGeneral.historicalScoringSystemParsedFilename[] = [];

    for (const availableDataFilename of availableDataFilenames) {
        parsedDataFilenames.push(
            parseDataFilename(availableDataFilename)
        );
    }

    for (const filename of parsedDataFilenames) {
        const tradingPair = parseTradingPair(filename.tradingPair);
        const duration = parseInt(filename.endDate) - parseInt(filename.startDate);

        parsedDataForQuery.push({
            name: filename.name,
            tradingPair: filename.tradingPair,
            base: tradingPair.base,
            quote: tradingPair.quote,
            timeframe: filename.timeframe as NsGeneral.IsTimeframe,
            duration: duration
        });
    }

    console.log(args);
    console.log(parsedDataForQuery);

    if (args.show) {
        consoleTable(parsedDataFilenames);
        return;
    }

    const filteredFiles = [];

    for (const fileInfo of parsedDataForQuery) {
        const typedArgs = args as unknown as { [key: string]: string; };
        const typedFileInfo = fileInfo as unknown as { [key: string]: string; };
        const keys = Object.keys(fileInfo);


        let valid = true;
        
        for (const key of keys) {
            if (!(key in typedArgs)) {
                if (key === "duration") {
                    const minDuration = parseInt(typedArgs.minDuration);

                    if (fileInfo.duration < minDuration) {
                        valid = false;
                        break;
                    }
                }
            } else {
                if (typedArgs[key] && typedArgs[key] !== typedFileInfo[key]) {
                    valid = false;
                    break;

                }
            }
        }

        // Generate the output directory if it doesn't exist (recursively)
        if (!fs.existsSync(args.scorePath)) {
            fs.mkdirSync(args.scorePath, { recursive: true });

            logger.info(`Directory '${args.scorePath}' created.`);
        }
    }
}