import * as osu from "node-os-utils";


/**
 * Get the current process usage.
 *
 * Note: CPU usage is handled by an another way as the pidusage package
 * doesn't provide a precise way to get the CPU usage of the current process on Windows.
 *
 * @returns A promise that resolves with the process usage.
 */
export async function getProcessUsage() {
    const coreCount = osu.cpu;
    const cpuUsage = osu.cpu;
    const memoryUsage = osu.mem;
    const os = osu.os;

    return {
        cores: coreCount,
        percentage: cpuUsage,
        memory: memoryUsage,
        platform: os
    };
}