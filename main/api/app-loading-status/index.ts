import { mainWindow, splashScreen } from "@main/background";
import ERRORS from "@main/lib/utils/errors";
import { AppLoadingStatus } from "@sharedTypes/api";
import { IpcResponse, ParsedIpcRequest } from "@sharedTypes/ipc";


/**
 * An object containing multiple information about the app loading status.
 * Stored temporarily in memory during the app lifecycle.
 */
const appLoadingStatus: AppLoadingStatus = {
    currentWindow: "splash-screen",
    loaded: false,
    progress: 0,
    stream: "Loading /core/modules/langlerd/measde/opriont.js ..."
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
async function post(req: ParsedIpcRequest): Promise<IpcResponse> {
    const { mode } = req.body as { mode?: "close-splash-screen" | "open-main-window"; };

    // TODO: Remove that at one point
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (mode === "close-splash-screen") {
        appLoadingStatus.currentWindow = "none";
        splashScreen.destroy();
    } else if (mode === "open-main-window") {
        appLoadingStatus.currentWindow = "main-window";
        mainWindow.show();
    } else {
        return {
            success: false,
            message: "Invalid mode.",
            data: ERRORS.UNPROCESSABLE_ENTITY
        };
    }

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
    if (req.method === "POST") return await post(req);
    if (req.method === "PATCH") return await patch(req);

    return {
        success: false,
        message: "This route only supports 'GET' and 'PATCH' requests.",
        data: ERRORS.METHOD_NOT_ALLOWED
    };
}