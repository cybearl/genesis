import { IpcRendererEvent, contextBridge, ipcRenderer } from "electron";


const WINDOW_API = {
    platform: process.platform,

    send(channel: string, value: unknown) {
        ipcRenderer.send(channel, value);
    },

    on(channel: string, callback: (...args: unknown[]) => void) {
        const subscription = (_event: IpcRendererEvent, ...args: unknown[]) => callback(...args);
        ipcRenderer.on(channel, subscription);

        return () => ipcRenderer.removeListener(channel, subscription);
    }
};

contextBridge.exposeInMainWorld("api", WINDOW_API);
export type IsWindowApi = typeof WINDOW_API;