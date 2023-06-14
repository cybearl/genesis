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