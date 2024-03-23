import { AppLoadingStatus } from "@sharedTypes/api";


/**
 * Retrieves the app loading status.
 * @returns The app loading status.
 */
export async function getAppLoadingStatus() {
    const response = await window.ipcBridge("/api/app-loading-status");
    if (response.success) return response.data as AppLoadingStatus;

    console.error(`Failed to get app loading status: ${response.data}`);
    return null;
}

/**
 * Updates the app loading status.
 * @param frontendProgressAdder The amount to add to the frontend progress.
 * @returns The updated app loading status.
 */
export async function updateAppLoadingStatus(frontendProgressAdder?: number) {
    const response = await window.ipcBridge("/api/app-loading-status", {
        method: "PATCH",
        body: {
            frontendProgressAdder
        }
    });

    if (response.success) return response.data as AppLoadingStatus;

    console.error(`Failed to update app loading status: ${response.data}`);
    return null;
}