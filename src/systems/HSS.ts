import fs from "fs";

import { getFiles } from "helpers/local/files";
import { consoleTable, getDuration, parseDataFilename } from "helpers/local/IO";
import { parseTradingPair } from "helpers/online/exchange";
import { scoreHelpMsg } from "scripts/messages/messages";
import NsGeneral from "types/general";
import logger from "utils/logger";


/**
 * Get the files, recover their info (filename)
 * and filter them, returning the filtered files.
 * @param args The command line arguments.
 * @param availableFiles The available files.
 * @returns The filtered files.
 */
function getFilteredFiles(
    args: NsGeneral.historicalScoringSystemOptions,
    availableFiles: string[]
) {
    let minDuration: number = 1 * 60 * 60 * 1000;

    // Get the minDuration in milliseconds from available timeframes
    if (args.minDuration) {
        const durationFromArg = getDuration(args.minDuration as unknown as NsGeneral.IsTimeframe);

        if (durationFromArg) {
            minDuration = durationFromArg;
        } else {
            logger.error(`Invalid duration: ${args.minDuration}`);
            logger.warn("Defaulting duration to '1h'.");
        }
    }

    const parsedFilenames = [];
    const parsedDataForQuery: NsGeneral.historicalScoringSystemParsedFilename[] = [];
    // logger.error("Available durations: _s (seconds), _m (minutes), _h (hours), _d (days)");
    // logger.error("Replace underscores by the duration value (e.g. 1m, 30m, 1h, 1d)");

    for (const availableDataFilename of availableFiles) {
        parsedFilenames.push(
            parseDataFilename(availableDataFilename)
        );
    }

    for (const filename of parsedFilenames) {
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

    const filteredFiles: NsGeneral.historicalScoringSystemParsedFilename[] = [];

    for (const fileInfo of parsedDataForQuery) {
        const typedArgs = args as unknown as { [key: string]: string; };
        const typedFileInfo = fileInfo as unknown as { [key: string]: string; };
        const keys = Object.keys(fileInfo);

        let valid = true;

        // For each key in the fileInfo object
        for (const key of keys) {
            // If the key is not in the typedArgs object
            if (!(key in typedArgs)) {
                // Apply custom logic to duration key (minDuration)
                if (key === "duration") {
                    if (minDuration && fileInfo.duration < minDuration) {
                        valid = false;
                        break;
                    }
                }
            } else {
                // If the key is in the typedArgs object
                if (typedArgs[key] && typedArgs[key] !== typedFileInfo[key]) {
                    valid = false;
                    break;
                }
            }
        }

        // Pushing validated files to the filteredFiles array
        if (valid) {
            filteredFiles.push(fileInfo);
        }
    }

    return {
        parsedFilenames,
        filteredFiles
    };
}


/**
 * Main function for the HSS system,
 * generates a score for a strategy based on
 * the historical data of a trading pair.
 *
 * @param args The command line arguments.
 */
export default async function main(
    args: NsGeneral.historicalScoringSystemOptions
) {
    if (args.help) {
        console.log(scoreHelpMsg);
        return;
    }

    const availableFiles = getFiles(args.dataPath, ".json");
    const { parsedFilenames, filteredFiles } = getFilteredFiles(args, availableFiles);

    if (args.showFiltered) {
        // Show the filtered files
        consoleTable(filteredFiles as unknown as { [key: string]: string; }[]);

        return;
    } else if (args.show) {
        // Show all files
        consoleTable(parsedFilenames);

        return;
    }

    // TODO: Link the file paths to the output file info (filteredFiles)
    // Generate the output directory if it doesn't exist (recursively)
    if (!fs.existsSync(args.scorePath)) {
        fs.mkdirSync(args.scorePath, { recursive: true });

        logger.info(`Directory '${args.scorePath}' created.`);
    }
}