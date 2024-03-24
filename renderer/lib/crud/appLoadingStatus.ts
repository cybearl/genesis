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
 * Closes the splash screen and shows the main window.
 * @returns The app loading status.
 */
export async function closeSplashScreen() {
    const response = await window.ipcBridge("/api/app-loading-status", {
        method: "POST"
    });

    if (response.success) return response.data as AppLoadingStatus;
    console.error(`Failed to close splash screen: ${response.data}`);
    return null;
}

/**
 * Updates the app loading status.
 * @param progressAdder The amount to add to the progress.
 * @returns The updated app loading status.
 */
export async function updateAppLoadingStatus(progressAdder?: number) {
    const response = await window.ipcBridge("/api/app-loading-status", {
        method: "PATCH",
        body: {
            progressAdder
        }
    });

    if (response.success) return response.data as AppLoadingStatus;
    console.error(`Failed to update app loading status: ${response.data}`);
    return null;
}