import { IpcMainInvokeEvent } from "electron";

import { appConfig } from "@main/configs/app.config";
import { IpcFetchRequest, IpcFetchResponse } from "@sharedTypes/shared";


/**
 * `GET` /api/info route handler.
 * @returns The info of the application.
 */
const getInfo = async () => appConfig;

/**
 * Handler for the /api/info route.
 */
export default async function handler(
    event: IpcMainInvokeEvent,
    req: IpcFetchRequest
): Promise<IpcFetchResponse> {
    if (req.method === "GET") {
        const data = await getInfo();

        return {
            status: 200,
            message: "OK",
            data: data
        };
    }

    return {
        status: 404,
        message: "Not Found"
    };
}