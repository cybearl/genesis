/**
 * Units for the memory.
 */
export enum Units {
    None = 1,
    K = 1024,
    M = 1024 * 1024,
    G = 1024 * 1024 * 1024,
    T = 1024 * 1024 * 1024 * 1024
};

/**
 * Mapping for the memory units.
 */
export const MemoryMap = {
    "TB": Units.T,
    "GB": Units.G,
    "MB": Units.M,
    "KB": Units.K,
    "B": Units.None
};