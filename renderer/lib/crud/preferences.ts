import { Preferences } from "@sharedTypes/storage";


/**
 * Retrieves the preferences.
 * @returns The preferences.
 */
export async function getPreferences(): Promise<Preferences | null> {
    const response = await window.ipcBridge("/api/preferences");

    if (response.success) return response.data as Preferences;
    console.error(`Failed to get the preferences: ${response.data}`);
    return null;
}