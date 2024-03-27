import path from "path";

import { app } from "electron";

import ERRORS from "@main/lib/utils/errors";
import { Environment } from "@sharedTypes/api";
import { IpcResponse, ParsedIpcRequest } from "@sharedTypes/ipc";


/**
 * `GET` `/api/environment` route handler.
 * @returns The app environment.
 */
async function get(): Promise<IpcResponse> {
    const appPath = app.getAppPath();
    const iconPath = path.join(appPath, "..", "assets", "favicon.ico");

    const data: Environment = {
        env: app.isPackaged ? "production" : "development",
        appName: app.getName(),
        appStage: "pre-alpha",
        appVersion: app.getVersion(),
        appIcon: iconPath,
        appPath: app.getAppPath()
    };

    return {
        success: true,
        message: "Successfully retrieved environment.",
        data: data
    };
}

/**
 * Backend endpoint to get the app environment.
 * @returns The environment.
 */
export async function getEnvironment(): Promise<Environment> {
    const response = await get();
    return response.data as Environment;
}

/**
 * Handler for the `/api/environment` route.
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