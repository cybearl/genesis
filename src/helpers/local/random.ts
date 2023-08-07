import { generateMnemonic } from "bip39";


/**
 * Generates a random name using BIT39 mnemonic.
 * @returns The random name.
 */
export function generateRandomName() {
    const mnemonic = generateMnemonic();
    const words = mnemonic.split(" ");
    const randomIndex1 = Math.floor(Math.random() * (words.length - 1));
    const randomIndex2 = Math.floor(Math.random() * (words.length - 1));

    return words[randomIndex1] + "-" + words[randomIndex2];
}

/**
 * Generates a random bot name for the tests/development.
 * @param length The length of the bot name (defaults to 16).
 * @returns The random bot name.
 */
export function generateRandomBotName(length = 16) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const charactersLength = characters.length;
    let result = "";

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

/**
 * Generates a random number for the tests/development.
 * @param min The minimum value (defaults to 0).
 * @param max The maximum value (defaults to 16384).
 * @returns The random number.
 */
export function generateRandomNumber(min = 0, max = 16384) {
    return Math.random() * (max - min) + min;
}