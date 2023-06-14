import crypto from "crypto";
import * as readline from "readline";

import date from "date-and-time";
import { ObjectId } from "mongodb";

import { GENERAL_CONFIG } from "../configs/global.config";
import NsGeneral from "../types/general";
import logger from "../utils/logger";


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
 * Returns a date with the specified number of days removed.
 * @param date The date to remove days from.
 * @param days The number of days to remove.
 */
export function removeDays(date: Date, days: number) {
    const result = new Date(new Date().setDate(date.getDate() - days));

    return result;
}