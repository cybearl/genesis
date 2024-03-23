import { mainWindow, splashScreen } from "@main/background";
import { ERRORS } from "@main/lib/errors";
import { AppLoadingStatus } from "@sharedTypes/api";
import { IpcResponse, ParsedIpcRequest } from "@sharedTypes/ipc";


/**
 * An object containing multiple information about the app loading status.
 * Stored temporarily in memory during the app lifecycle.
 */
const appLoadingStatus: AppLoadingStatus = {
    frontend: {
        loaded: false,
        progress: 0,
        stream: ""
    },
    backend: {
        loaded: false,
        progress: 0,
        stream: ""
    }
};

/**
 * Backend way to update the app loading status.
 * @param frontendProgressAdder The amount to add to the frontend progress.
 * @param backendProgressAdder The amount to add to the backend progress.
 * @returns The updated app loading status.
 */
export function updateAppLoadingStatus(frontendProgressAdder?: number, backendProgressAdder?: number): AppLoadingStatus {
    if (frontendProgressAdder && frontendProgressAdder >= 0 && frontendProgressAdder <= 100) {
        appLoadingStatus.frontend.progress += frontendProgressAdder;
    }

    if (backendProgressAdder && backendProgressAdder >= 0 && backendProgressAdder <= 100) {
        appLoadingStatus.backend.progress += backendProgressAdder;
    }

    return appLoadingStatus;
}

/**
 * Handler for the `/api/app-loading-status` route.
 * @param req The parsed ipc request.
 * @returns The ipc response.
 */
export default async function handler(req: ParsedIpcRequest): Promise<IpcResponse> {
    if (req.method === "GET") {
        return {
            success: true,
            message: "Successfully retrieved app loading status.",
            data: appLoadingStatus
        };
    }

    if (req.method === "PATCH") {
        const { frontendProgressAdder } = req.body as { frontendProgressAdder?: number; };

        if (frontendProgressAdder) {
            if (frontendProgressAdder < 0 || frontendProgressAdder > 100) {
                return {
                    success: false,
                    message: "Invalid frontend progress adder (should be between 0 and 100).",
                    data: ERRORS.UNPROCESSABLE_ENTITY
                };
            }

            appLoadingStatus.frontend.progress += frontendProgressAdder;

            if (appLoadingStatus.frontend.progress >= 100) {
                appLoadingStatus.frontend.loaded = true;
                splashScreen.destroy();
                mainWindow.show();
            }
        }

        return {
            success: true,
            message: "Successfully updated app loading status.",
            data: appLoadingStatus
        };
    }

    return {
        success: false,
        message: "This route only supports 'PATCH' requests.",
        data: ERRORS.METHOD_NOT_ALLOWED
    };
}