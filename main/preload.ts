import { contextBridge, ipcRenderer } from "electron";

import { IpcRequestOptions, IpcResponse } from "@sharedTypes/shared";


/**
 * The ipc bridge function passes the request to the main process
 * via the ipc router and returns the response.
 * @param url The ipc route url.
 * @param method The method to use (optional, defaults to `GET`).
 * @param body The body of the request (optional, defaults to `undefined`).
 * @returns A promise that resolves to the response.
 */
async function ipcBridge(
    url: string,
    options?: IpcRequestOptions
): Promise<IpcResponse> {
    if (!url) throw new Error("URL is required.");
    if (typeof url !== "string") throw new Error("URL must be a string.");

    if (options) {
        if (options.method === "GET" && options.body) throw new Error("GET requests cannot have a body.");
        if (options.method !== "GET" && !options.body) throw new Error("Non-GET requests must have a body.");
    }

    const response = await ipcRenderer.invoke("ipc::router", { url, options });
    return response;
}


contextBridge.exposeInMainWorld("ipcBridge", ipcBridge);
export type IpcBridge = typeof ipcBridge;