import { Balance, Balances, Exchange } from "ccxt";

import logger from "utils/logger";


/**
 * Load the exchange balances (every token).
 * @param exchange The exchange.
 * @returns The balances.
 */
export async function loadBalances(exchange: Exchange) {
    const balances = await exchange.fetchBalance();

    // Log the balance information
    logger.verbose(`${exchange.name} balances loaded.`);

    return balances;
}

/**
 * Fetch balance by token based on the balances dictionary.
 * @param balances The loaded balances.
 * @param token The token.
 * @returns The balance.
 */
export function getBalance(balances: Balances, token: string): Balance {
    const balance = balances[token];

    if (!balance) {
        logger.error(`The token ${token} is not available!`);
        process.exit(1);
    }

    // Log the balance information
    logger.info(`${balance.free} ${token} available, ${balance.used} ${token} used.`);

    return balance;
}
