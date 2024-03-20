import { currentLoad, mem } from "systeminformation";

import { MemoryMap } from "@main/utils/units";
import { FetchRequest, FetchResponse, SHR__SysInfo } from "@sharedTypes/shared";


/**
 * `GET` /api/sysinfo route handler.
 * @returns The system information.
 */
async function getSysInfo(): Promise<SHR__SysInfo> {
    const sysCPU = await currentLoad();
    const sysMemory = await mem();
    const sysMemoryAvailableGB = sysMemory.available / MemoryMap.GB;
    const sysMemoryUsedGB = sysMemory.active / MemoryMap.GB;
    const sysMemoryTotalGB = sysMemory.total / MemoryMap.GB;
    const sysMemoryPercentage = (sysMemoryUsedGB / sysMemoryTotalGB) * 100;

    const data: SHR__SysInfo = {
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

    return data;
}

/**
 * Handler for the /api/sysinfo route.
 */
export default async function handler(req: FetchRequest): Promise<FetchResponse> {
    if (req.method === "GET") {
        const data = await getSysInfo();

        return {
            status: 200,
            message: "OK",
            data: data
        };
    }

    return {
        status: 405,
        message: "Method Not Allowed",
        data: null
    };
}