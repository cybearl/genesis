import { app } from "electron";

import { ERRORS } from "@main/lib/errors";
import { Environment } from "@sharedTypes/environment";
import { IpcResponse, ParsedIpcRequest } from "@sharedTypes/ipc";


/**
 * `GET` `/api/environment` route handler.
 * @returns The system information.
 */
async function getEnvironment(): Promise<Environment> {
    return {
        environment: app.isPackaged ? "production" : "development",
        version: app.getVersion(),
        path: app.getAppPath()
    };
}

/**
 * Handler for the `/api/environment` route.
 * @param req The parsed ipc request.
 * @returns The ipc response.
 */
export default async function handler(req: ParsedIpcRequest): Promise<IpcResponse> {
    if (req.method === "GET") {
        const data = await getEnvironment();

        return {
            success: true,
            message: "Successfully retrieved static configuration.",
            data: data
        };
    }

    return {
        success: false,
        message: "This route only supports 'GET' requests.",
        data: ERRORS.METHOD_NOT_ALLOWED
    };
}