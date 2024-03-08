import { contextBridge, ipcRenderer } from "electron";

import { FetchResponse, RawFetchRequestOptions } from "@sharedTypes/shared";


/**
 * The ipcFetch API provides an interface allowing communication between the
 * renderer process and the main process.
 * @param url The URL to fetch.
 * @param method The HTTP method to use (optional, defaults to `GET`).
 * @param body The body of the request (optional, defaults to `undefined`).
 * @returns A promise that resolves to the response.
 */
async function ipcFetch(
    url: string,
    options?: RawFetchRequestOptions
): Promise<FetchResponse> {
    if (!url) throw new Error("URL is required.");
    if (typeof url !== "string") throw new Error("URL must be a string.");

    if (options) {
        if (options.method === "GET" && options.body) throw new Error("GET requests cannot have a body.");
        if (options.method !== "GET" && !options.body) throw new Error("Non-GET requests must have a body.");
    }

    const response = await ipcRenderer.invoke("ipc::router", { url, options });
    return response;
}


contextBridge.exposeInMainWorld("ipcFetch", ipcFetch);
export type IpcFetch = typeof ipcFetch;