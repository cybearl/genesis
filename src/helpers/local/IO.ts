import crypto from "crypto";
import * as readline from "readline";

import date from "date-and-time";
import { ObjectId } from "mongodb";

import { GENERAL_CONFIG } from "configs/global.config";
import NsGeneral from "types/general";
import logger from "utils/logger";


/**
 * Encode a string to sha256 truncated to 24 character.
 * @param input The input string.
 * @returns The sha256 encoded string.
 */
export function sha256(input: string) {
    const hash = crypto.createHash("sha256").update(input).digest("hex");
    return hash.substring(0, 24);
}

/**
 * Get the MongoDB object ID from the bot name.
 * @param sandbox If the bot is running in sandbox mode.
 * @param name The bot name.
 * @returns The MongoDB object ID.
 */
export function getObjectId(sandbox: boolean, name: string) {
    const ID = sha256(
        sandbox ? `${name}-sandbox` : name
    );

    return ObjectId.createFromHexString(ID).toString("hex");
}

/**
 * Asks the user for input and returns the answer.
 * @param question The question to ask the user.
 * @returns The answer.
 */
export function getUserInput(question: string): Promise<string> {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => {
        logger.warn(question);

        rl.question("", (answer) => {
            rl.close();
            resolve(answer);
        });
    });
}

/**
 * Get the time data in ms from a time string (FATAL).
 * These time strings are similar to the ones used on Binance Spot.
 * @param timeString The time string.
 * @returns The time in ms.
 */
export function getTimeframe(
    timeString: NsGeneral.IsTimeframe = "1m"
) {
    const time = parseInt(timeString.slice(0, -1));
    const timeframe = timeString.slice(-1);

    switch (timeframe) {
        case "s":
            return time * 1000;
        case "m":
            return time * 60 * 1000;
        case "h":
            return time * 60 * 60 * 1000;
        case "d":
            return time * 24 * 60 * 60 * 1000;
        default:
            logger.error(`Invalid timeframe: ${timeframe}`);
            logger.error("Available timeframes: 30s, 1m, 3m, 5m, 15m, 30m, 1h, 2h, 4h, 1d");
            process.exit(1);
    }
}

/**
 * Get the duration in ms from a time string.
 * @param timeString The time string.
 * @returns The time in ms.
 */
export function getDuration(
    timeString: string
) {
    if (timeString) {
        try {
            const duration = parseInt(timeString.slice(0, -1));
            const timeframe = timeString.slice(-1);

            switch (timeframe) {
                case "s":
                    return duration * 1000;
                case "m":
                    return duration * 60 * 1000;
                case "h":
                    return duration * 60 * 60 * 1000;
                case "d":
                    return duration * 24 * 60 * 60 * 1000;
                default:
                    return 1 * 60 * 60 * 1000;
            }
        } catch (err) {
            logger.error(`Invalid duration: ${timeString}`);
            logger.warn("Defaulting duration to '1h'.");

            return 1 * 60 * 60 * 1000;
        }
    }

    return undefined;
}

/**
 * Get the current date string.
 * @param format The date format (optional, defaults to general config dateFormat).
 * @returns The current date string.
 */
export function getCurrentDateString(format?: string) {
    return date.format(
        new Date(),
        format ?? GENERAL_CONFIG.dateFormat
    );
}

/**
 * Get date string from a date.
 * @param dateInput The date to get the string from.
 * @param format The date format (optional, defaults to general config dateFormat).
 * @returns The date string.
 */
export function getDateString(dateInput: Date, format?: string) {
    return date.format(
        dateInput,
        format ?? GENERAL_CONFIG.dateFormat
    );
}

/**
 * Parse the name of a data file to recover the info about the contained data.
 * @param filename The name of the file.
 * @returns The info about the data contained in the file.
 */
export function parseDataFilename(filename: string) {
    const info = filename.split(" ");

    // Format the trading pair as 'BASE/QUOTE' (remove parenthesis and replace '-' with '/)
    const tradingPair = info[0]
        .split("-")
        .join("/")
        .substring(1, info[0].length - 1);

    const name = info[1];

    // Timeframe is already in the correct format
    const timeframe = info[2];

    // Get start and end date in the correct format
    const startDate = info[3];
    const endDate = info[4];

    const res = {
        name,
        tradingPair,
        timeframe,
        startDate,
        endDate
    };

    return res;
}

/**
 * Returns a date with the specified number of days removed.
 * @param date The date to remove days from.
 * @param days The number of days to remove.
 */
export function removeDays(date: Date, days: number) {
    const result = new Date(new Date().setDate(date.getDate() - days));

    return result;
}


/**
 * Get remaining time from a date, in days, hours, minutes and seconds.
 * @param date The date to get the remaining time from.
 */
export function getRemainingTime(date: Date) {
    // Get the ms of the date
    const dateTime = date.getTime();

    let seconds = Math.floor(dateTime / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    hours = hours - (days * 24);
    minutes = minutes - (days * 24 * 60) - (hours * 60);
    seconds = seconds - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60);

    return {
        days: days > 0 ? `${days}d ` : "",
        hours: hours > 0 ? `${hours}h ` : "",
        minutes: minutes > 0 ? `${minutes}m ` : "",
        seconds: seconds > 0 ? `${seconds}s` : ""
    };
}


/**
 * Custom console table for printing object arrays.
 * Dates are converted to strings.
 * Ms are converted to date strings.
 * @param objs The objects to print.
 */
export function consoleTable(objs: { [key: string]: unknown; }[]) {
    const formattedObjs = objs.map((obj) => {
        if (obj.date) {
            obj.date = getDateString(obj.date as Date);
        }

        if (obj.startDate) {
            obj.startDate = getDateString(
                new Date(parseInt(obj.startDate as string))
            );
        }

        if (obj.endDate) {
            obj.endDate = getDateString(
                new Date(parseInt(obj.endDate as string))
            );
        }

        if (obj.duration) {
            const formattedDuration = getRemainingTime(new Date(obj.duration as number));
            obj.duration = `${formattedDuration.days}${formattedDuration.hours}${formattedDuration.minutes}${formattedDuration.seconds}`;
        }

        return obj;
    });

    console.table(formattedObjs);
}

/**
 * Search in a list of filenames for a query.
 * @param filenames The filenames to search.
 * @param query The query to search.
 * @returns The filename(s) that match the query.
 */
export function searchQueryInFilenames(
    filenames: string[],
    query: string
) {
    const res: string[] = [];

    for (const filename of filenames) {
        if (filename.includes(query)) {
            res.push(filename);
        }
    }

    return res;
}