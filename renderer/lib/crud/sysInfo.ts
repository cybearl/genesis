import { SysInfo } from "@sharedTypes/api";


/**
 * Returns the system information such as the CPU and memory usage.
 * @returns The system information (as a `SysInfo` object).
 */
export async function getSysInfo() {
    const response = await window.ipcBridge("/api/sys-info");
    return response.data as SysInfo | null;
}