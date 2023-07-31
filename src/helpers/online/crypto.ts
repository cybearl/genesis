import { ethers } from "ethers";


/**
 * Get the chain provider.
 *
 * Sandbox active:
 * - Localhost.
 * - If localhost is not available, testnet.
 *
 * Sandbox inactive:
 * - Mainnet.
 * @param sandbox If the sandbox is active.
 * @param network Network to use if no localhost.
 * @returns The chain provider.
 */
export function getProvider(
    sandbox: boolean,
    network: string
) {

    if (!process.env.INFURA_API_KEY || !process.env.INFURA_API_SECRET) {
        throw new Error("Missing Infura API key or secret.");
    }

    if (sandbox) {
        if (!process.env.LOCALHOST_CHAIN_URL || !process.env.LOCALHOST_CHAIN_ID) {
            throw new Error("Localhost chain URL or chain ID is not defined.");
        }

        // Localhost
        try {
            return new ethers.JsonRpcProvider(
                process.env.LOCALHOST_CHAIN_URL,
                {
                    name: "localhost",
                    chainId: parseInt(process.env.LOCALHOST_CHAIN_ID)
                }
            );
        } catch (err) {
            // Testnet
            return ethers.getDefaultProvider(network);
        }
    }

    // Mainnet
    return new ethers.InfuraProvider(
        network,
        process.env.INFURA_API_KEY,
        process.env.INFURA_API_SECRET
    );
}