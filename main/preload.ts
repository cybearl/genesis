import { IpcRendererEvent, contextBridge, ipcRenderer } from "electron";


/**
 * The API exposed to the renderer process.
 *
 * **Security Note:** Direct access to API functions should be avoided,
 * instead, every exposed function should corresponds to a specific task.
 */
const WINDOW_API = {
    platform: process.platform,

    send(channel: string, value: unknown) {
        ipcRenderer.send(channel, value);
    },

    invoke(channel: string, value: unknown) {
        return ipcRenderer.invoke(channel, value);
    },

    on(channel: string, callback: (...args: unknown[]) => void) {
        const subscription = (_event: IpcRendererEvent, ...args: unknown[]) => callback(...args);
        ipcRenderer.on(channel, subscription);

        return () => ipcRenderer.removeListener(channel, subscription);
    }
};

contextBridge.exposeInMainWorld("api", WINDOW_API);
export type IsWindowAPI = typeof WINDOW_API;