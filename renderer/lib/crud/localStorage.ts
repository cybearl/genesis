import { LocalStorage } from "@sharedTypes/storage";


/**
 * Retrieves the local storage.
 * @returns The local storage.
 */
export async function getLocalStorage(): Promise<LocalStorage | null> {
    const response = await window.ipcBridge("/api/local-storage");

    if (response.success) return response.data as LocalStorage;
    console.error(`Failed to get the local storage: ${response.data}`);
    return null;
}