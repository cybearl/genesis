import { IpcMainInvokeEvent } from "electron";

import { IpcFetchRequest } from "@sharedTypes/shared";


/**
 * Handler for the /api/info route.
 *
 */
export default async function handler(
    event: IpcMainInvokeEvent,
    req: IpcFetchRequest
) {
    return {
        status: 200,
        message: "OK",
        data: {
            name: "Electron React Boilerplate",
            version: "1.0.0",
            isDev: true
        }
    };
}