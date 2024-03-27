import { UserPreferences } from "@sharedTypes/storage";


/**
 * Retrieves the user preferences.
 * @returns The user preferences.
 */
export async function getUserPreferences(): Promise<UserPreferences | null> {
    const response = await window.ipcBridge("/api/user-preferences");

    if (response.success) return response.data as UserPreferences;
    console.error(`Failed to get user preferences: ${response.data}`);
    return null;
}