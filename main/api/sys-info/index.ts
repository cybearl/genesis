import { currentLoad, mem } from "systeminformation";

import ERRORS from "@main/lib/utils/errors";
import { MemoryMap } from "@main/lib/utils/units";
import { SysInfo } from "@sharedTypes/api";
import { IpcResponse, ParsedIpcRequest } from "@sharedTypes/ipc";


/**
 * `GET` `/api/sys-info` route handler.
 * @returns The system information.
 */
async function get(): Promise<IpcResponse> {
    const sysCPU = await currentLoad();
    const sysMemory = await mem();
    const sysMemoryAvailableGB = sysMemory.available / MemoryMap.GB;
    const sysMemoryUsedGB = sysMemory.active / MemoryMap.GB;
    const sysMemoryTotalGB = sysMemory.total / MemoryMap.GB;
    const sysMemoryPercentage = (sysMemoryUsedGB / sysMemoryTotalGB) * 100;

    const data: SysInfo = {
        cpu: {
            percentage: (100 - sysCPU.currentLoadIdle).toFixed(2),
            str: `${(100 - sysCPU.currentLoadIdle).toFixed(2)}%`
        },
        memory: {
            available: sysMemoryAvailableGB.toFixed(2),
            used: sysMemoryUsedGB.toFixed(2),
            total: sysMemoryTotalGB.toFixed(2),
            percentage: sysMemoryPercentage.toFixed(2),
            str: `${sysMemoryUsedGB.toFixed(2)} / ${sysMemoryTotalGB.toFixed(2)} GB (${sysMemoryPercentage.toFixed(2)}%)`
        }
    };

    return {
        success: true,
        message: "Successfully retrieved system information.",
        data: data
    };
}

/**
 * Handler for the `/api/sys-info` route.
 * @param req The parsed ipc request.
 * @returns The ipc response.
 */
export default async function handler(req: ParsedIpcRequest): Promise<IpcResponse> {
    if (req.method === "GET") return await get();

    return {
        success: false,
        message: "This route only supports 'GET' requests.",
        data: ERRORS.METHOD_NOT_ALLOWED
    };
}