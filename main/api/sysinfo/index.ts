import { currentLoad, mem } from "systeminformation";

import { MemoryMap } from "@main/utils/units";
import { FetchRequest, FetchResponse } from "@sharedTypes/shared";


type SysInfo = {
    cpuPercentage: string;
    memoryUsedInGB: string;
    memoryTotalInGB: string;
    memoryPercentage: string;
};


/**
 * `GET` /api/sysinfo route handler.
 * @returns The system information.
 */
const getSysInfo = async (): Promise<SysInfo> => {
    const cpuLoad = await currentLoad();
    const memoryLoad = await mem();

    const memoryUsed = memoryLoad.active / MemoryMap.GB;
    const memoryTotal = memoryLoad.total / MemoryMap.GB;

    return {
        cpuPercentage: (100 - cpuLoad.currentLoadIdle).toFixed(2),
        memoryUsedInGB: memoryUsed.toFixed(2),
        memoryTotalInGB: memoryTotal.toFixed(2),
        memoryPercentage: ((memoryUsed / memoryTotal) * 100).toFixed(2)
    };
};

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