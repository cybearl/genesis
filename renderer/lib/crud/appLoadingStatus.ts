import { AppLoadingStatus } from "@sharedTypes/api";
import { ErrorCode } from "@sharedTypes/errors";


/**
 * Retrieves the app loading status.
 * @returns The app loading status.
 */
export async function getAppLoadingStatus() {
    const response = await window.ipcBridge("/api/app-loading-status");
    return response.data as AppLoadingStatus | null;
}

/**
 * Updates the app loading status.
 * @param frontendProgressAdder The amount to add to the frontend progress.
 * @param backendProgressAdder The amount to add to the backend progress.
 * @returns The updated app loading status.
 */
export async function updateAppLoadingStatus(frontendProgressAdder?: number, backendProgressAdder?: number) {
    const response = await window.ipcBridge("/api/app-loading-status", {
        method: "PATCH",
        body: {
            frontendProgressAdder,
            backendProgressAdder
        }
    });

    return response.data as AppLoadingStatus | ErrorCode;
}