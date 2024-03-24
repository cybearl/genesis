import { mainWindow, splashScreen } from "@main/background";
import ERRORS from "@main/lib/utils/errors";
import { AppLoadingStatus } from "@sharedTypes/api";
import { IpcResponse, ParsedIpcRequest } from "@sharedTypes/ipc";


/**
 * An object containing multiple information about the app loading status.
 * Stored temporarily in memory during the app lifecycle.
 */
const appLoadingStatus: AppLoadingStatus = {
    loaded: false,
    progress: 0,
    stream: ""
};


/**
 * `GET` `/api/app-loading-status` route handler.
 * @returns The app loading status.
 */
async function get(): Promise<IpcResponse> {
    return {
        success: true,
        message: "Successfully retrieved app loading status.",
        data: appLoadingStatus
    };
}

/**
 * `POST` `/api/app-loading-status` route handler.
 * @returns The app loading status.
 */
async function post(): Promise<IpcResponse> {
    splashScreen.destroy();
    mainWindow.show();

    return {
        success: true,
        message: "Successfully finished loading the app and destroyed the splash screen.",
        data: appLoadingStatus
    };
}

/**
 * `PATCH` `/api/app-loading-status` route handler.
 * @returns The updated app loading status.
 */
async function patch(req: ParsedIpcRequest): Promise<IpcResponse> {
    const { progressAdder } = req.body as { progressAdder?: number; };

    if (progressAdder && !appLoadingStatus.loaded) {
        if (progressAdder < 0 || progressAdder > 100) {
            return {
                success: false,
                message: "Invalid progress adder (should be between 0 and 100).",
                data: ERRORS.UNPROCESSABLE_ENTITY
            };
        }

        if (appLoadingStatus.progress < 100) {
            appLoadingStatus.progress += progressAdder;
        }

        // Show splash screen after frontend replied by increasing progress
        if (appLoadingStatus.progress > 0 && !splashScreen.isDestroyed()) {
            splashScreen.show();
        }

        if (appLoadingStatus.progress >= 100) {
            appLoadingStatus.progress = 100;
            appLoadingStatus.loaded = true;
        }
    }

    return {
        success: true,
        message: "Successfully updated app loading status.",
        data: appLoadingStatus
    };
}

/**
 * Handler for the `/api/app-loading-status` route.
 * @param req The parsed ipc request.
 * @returns The ipc response.
 */
export default async function handler(req: ParsedIpcRequest): Promise<IpcResponse> {
    if (req.method === "GET") return await get();
    if (req.method === "POST") return await post();
    if (req.method === "PATCH") return await patch(req);

    return {
        success: false,
        message: "This route only supports 'GET', 'POST' and 'PATCH' requests.",
        data: ERRORS.METHOD_NOT_ALLOWED
    };
}