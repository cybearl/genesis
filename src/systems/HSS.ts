import fs from "fs";
import path from "path";

import { scoreHelpMsg } from "configs/messages.config";
import { getFiles } from "helpers/local/files";
import { consoleTable, getCurrentDateString, parseDataFilename } from "helpers/local/IO";
import { parseTradingPair } from "helpers/online/exchange";
import { convertOHLCVsToPriceBars } from "helpers/online/strategy";
import StrategyPool from "systems/SP";
import NsGeneral from "types/general";
import NsStrategy from "types/strategy";
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
 * Generates the output strategy directories and their last report subdirectories.
 * @param scorePath The path to the output directory.
 * @param strategyNames The names of the strategies.
 */
function generateStrategyAndReportDirs(scorePath: string, strategyNames: string[]) {
    const currentDate = getCurrentDateString("YYYY-MM-DD HH.mm.ss");

    for (const strategyName of strategyNames) {
        const strategyPath = path.join(scorePath, strategyName);

        if (!fs.existsSync(strategyPath)) {
            fs.mkdirSync(strategyPath, { recursive: true });

            logger.info(`Strategy score directory '${strategyPath}' created.`);
        }

        const reportPath = path.join(strategyPath, "reports", currentDate);

        if (!fs.existsSync(reportPath)) {
            fs.mkdirSync(reportPath, { recursive: true });

            logger.info(`Strategy score report directory '${reportPath}' created.`);
        }
    }
}

/**
 * Runs the strategy pool.
 * @param scorePath The path to the output directory.
 * @param filteredFiles The filtered files.
 * @param testFilePaths The paths to the test files.
 * @param sampleSize The sample size (optional, defaults to 16).
 */
function runStrategyPool(
    scorePath: string,
    filteredFiles: NsGeneral.historicalScoringSystemParsedFilename[],
    testFilePaths: string[],
    sampleSize = 16
) {
    const strategyPool = new StrategyPool();
    const strategyNames = strategyPool.getStrategyNames();

    // The strategy pool returns an object with the stats of each strategy,
    // We separate them by test file and store them in this object.
    const allStats: {
        [key: string]: {
            [key: string]: NsStrategy.storageStats;
        };
    } = {};

    generateStrategyAndReportDirs(scorePath, strategyNames);

    for (const [testFileIndex, testFilePath] of testFilePaths.entries()) {
        if (!fs.existsSync(testFilePath)) {
            logger.error(`File '${testFilePath}' does not exist.`);
            continue;
        }

        const filename = filteredFiles[testFileIndex].name;
        const testFile = fs.readFileSync(testFilePath, "utf8");
        const OHLCVs = JSON.parse(testFile);
        const priceBars = convertOHLCVsToPriceBars(OHLCVs);

        if (OHLCVs.length !== priceBars.length) {
            logger.error(`Error while converting OHLCVs to priceBars for file '${testFilePath}'.`);
            continue;
        }

        if (priceBars.length < sampleSize) {
            logger.warn(`File '${path.basename(testFilePath)}' has less than ${sampleSize} price bars (< sample size).`);
            logger.warn("Skipping...");
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

        // Add to all stats for this test file
        allStats[filename] = strategyPool.getStats();

        // Reset the strategy pool storages
        strategyPool.resetStorages();
    }

    console.log(allStats);
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
    // Generate the output directory if it doesn't exist (recursively)
    if (!fs.existsSync(options.scorePath)) {
        fs.mkdirSync(options.scorePath, { recursive: true });

        logger.info(`Directory '${options.scorePath}' created.`);
    }

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
        logger.error("No matching test file found, please, ensure that you ran the 'generate' command at least once, or verify your filters.");

        return;
    }

    // Runs the strategy pool
    runStrategyPool(
        options.scorePath,
        filteredFiles,
        filteredFilesWithPaths as string[]
    );
}