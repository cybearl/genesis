import fs from "fs";
import path from "path";

import { getFiles } from "helpers/local/files";
import { consoleTable, parseDataFilename } from "helpers/local/IO";
import { parseTradingPair } from "helpers/online/exchange";
import { convertOHLCVsToPriceBars } from "helpers/online/strategy";
import { scoreHelpMsg } from "scripts/messages/messages";
import StrategyPool from "systems/SP";
import NsGeneral from "types/general";
import logger from "utils/logger";


/**
 * Get the files, recover their info (filename)
 * and filter them, returning the filtered files.
 * @param options The parsed command line arguments.
 * @param availableFiles The available files.
 * @returns The filtered files.
 */
function getFilteredFiles(
    options: NsGeneral.historicalScoringSystemOptions,
    availableFiles: string[]
) {
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
        const typedOptions = options as unknown as { [key: string]: string; };
        const typedFileInfo = fileInfo as unknown as { [key: string]: string; };
        const keys = Object.keys(fileInfo);

        let valid = true;

        // For each key in the fileInfo object
        for (const key of keys) {
            // If the key is not in the typedOptions object
            if (!(key in typedOptions)) {
                // Apply custom logic to duration key (minDuration)
                if (key === "duration") {
                    if (options.minDuration && fileInfo.duration < options.minDuration) {
                        valid = false;
                        break;
                    }
                }
            } else {
                // If the key is in the typedOptions object
                if (typedOptions[key] && typedOptions[key] !== typedFileInfo[key]) {
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
 * Runs the strategy pool.
 */
function runStrategyPool(testFilePaths: string[], sampleSize = 16) {
    const strategyPool = new StrategyPool();

    for (const testFilePath of testFilePaths) {
        if (!fs.existsSync(testFilePath)) {
            logger.error(`File '${testFilePath}' does not exist.`);
            continue;
        }

        const testFile = fs.readFileSync(testFilePath, "utf8");

        const OHLCVs = JSON.parse(testFile);
        const priceBars = convertOHLCVsToPriceBars(OHLCVs);

        if (OHLCVs.length !== priceBars.length) {
            logger.error(`Error while converting OHLCVs to priceBars for file '${testFilePath}'.`);
            continue;
        }

        if (priceBars.length < sampleSize) {
            logger.error(`File '${testFilePath}' has less than ${sampleSize} price bars.`);
            continue;
        }

        let index = sampleSize;
        const currentOHLCVs = OHLCVs.slice(0, index);
        const currentPriceBars = priceBars.slice(0, index);

        while (index < priceBars.length) {
            // Remove the first element of the arrays
            currentOHLCVs.shift();
            currentPriceBars.shift();

            // Add the next element to the arrays
            currentOHLCVs.push(OHLCVs[index]);
            currentPriceBars.push(priceBars[index]);

            // Run the strategy pool
            strategyPool.run(currentOHLCVs, currentPriceBars);

            index++;
        }

        strategyPool.deleteMarketData();
    }

    const rawProfits = strategyPool.getRawProfits();

    console.log(rawProfits);

    console.log(
        "Final profit:",
        rawProfits["intraday"].reduce((a, b) => a + b, 0) / rawProfits["intraday"].length
    );
}


/**
 * Main function for the HSS system,
 * generates a score for a strategy based on
 * the historical data of a trading pair.
 * @param options The parsed command line arguments.
 */
export default async function main(
    options: NsGeneral.historicalScoringSystemOptions
) {
    if (options.help) {
        console.log(scoreHelpMsg);
        return;
    }

    // Recover the list of available files (filenames without extension)
    const availableFiles = getFiles(options.dataPath, ".json");

    const {
        parsedFilenames,
        filteredFiles
    } = getFilteredFiles(options, availableFiles);


    if (options.show) {
        // Show the filtered files
        consoleTable(filteredFiles as unknown as { [key: string]: string; }[]);


        return;
    }

    if (options.showAll) {
        // Show all files
        consoleTable(parsedFilenames);

        return;
    }

    // Links the filtered files to their respective paths
    const filteredFilesWithPaths = filteredFiles.map((file) => {
        for (const availableFile of availableFiles) {
            if (availableFile.includes(file.name)) {
                // Return normalized path
                return path.join(options.dataPath, `${availableFile}.json`);
            }
        }
    });

    if (filteredFilesWithPaths.length === 0) {
        logger.error("No matching test file found, please verify your filters.");

        return;
    }

    // Runs the strategy pool
    runStrategyPool(filteredFilesWithPaths as string[]);

    // Generate the output directory if it doesn't exist (recursively)
    if (!fs.existsSync(options.scorePath)) {
        fs.mkdirSync(options.scorePath, { recursive: true });

        logger.info(`Directory '${options.scorePath}' created.`);
    }
}