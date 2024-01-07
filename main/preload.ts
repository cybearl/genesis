import { contextBridge, ipcRenderer } from "electron";

import NsShared from "@sharedTypes/shared";


/**
 * The API exposed to the renderer process.
 *
 * **Security Note:** Direct access to API functions should be avoided,
 * instead, every exposed function should corresponds to a specific task.
 */
const WINDOW_API = {
    getAppInfo: async (): Promise<NsShared.AppInfo> => {
        const result = await ipcRenderer.invoke("app::info");
        return result;
    }
};

contextBridge.exposeInMainWorld("api", WINDOW_API);
export type IsWindowAPI = typeof WINDOW_API;