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
    if (frontendProgressAdder) appLoadingStatus.frontend.progress += frontendProgressAdder;
    if (backendProgressAdder) appLoadingStatus.backend.progress += backendProgressAdder;
    return appLoadingStatus;
}

/**
 * Handler for the `/api/app-loading-status` route.
 * @param req The parsed ipc request.
 * @returns The ipc response.
 */
export default async function handler(req: ParsedIpcRequest): Promise<IpcResponse> {
    const {
        frontendProgressAdder,
        backendProgressAdder
    } = req.body as {
        frontendProgressAdder?: number;
        backendProgressAdder?: number;
    };

    if (req.method === "GET") {
        return {
            success: true,
            message: "Successfully retrieved app loading status.",
            data: appLoadingStatus
        };
    }

    if (req.method === "PATCH") {
        if (frontendProgressAdder) appLoadingStatus.frontend.progress += frontendProgressAdder;
        if (backendProgressAdder) appLoadingStatus.backend.progress += backendProgressAdder;

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