import { generateMnemonic } from "bip39";


/**
 * Generates a random name using BIT39 mnemonic.
 * @returns The random name.
 */
export function generateRandomName() {
    const mnemonic = generateMnemonic();
    const words = mnemonic.split(" ");
    const randomIndex = Math.floor(Math.random() * (words.length - 1));

    return words[randomIndex];
}