import { contextBridge, ipcRenderer } from "electron";

import { IpcFetchResponse } from "@sharedTypes/shared";


/**
 * The ipcFetch API provides an interface allowing communication between the
 * renderer process and the main process.
 * @param url The URL to fetch.
 * @param method The HTTP method to use.
 * @param body The body of the request.
 * @returns A promise that resolves to the response.
 */
async function ipcFetch(
    url: string,
    method: "GET" | "POST" | "PATCH" | "DELETE" = "GET",
    body: any = undefined
): Promise<IpcFetchResponse> {
    // Validate the request
    if (method === "GET" && body) throw new Error("GET requests cannot have a body.");
    if (method !== "GET" && !body) throw new Error("Non-GET requests must have a body.");

    const response = await ipcRenderer.invoke("ipc::fetch", {
        url,
        method,
        body
    });

    return response;
}


contextBridge.exposeInMainWorld("ipcFetch", ipcFetch);
export type IpcFetch = typeof ipcFetch;