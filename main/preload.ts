import { contextBridge, ipcRenderer } from "electron";

import NsShared from "@sharedTypes/shared";

/**
 * The ipcFetcher API provides an interface allowing communication between the
 * renderer process and the main process.
 * @param url The URL to fetch.
 * @param method The HTTP method to use.
 * @param body The body of the request.
 * @returns A promise that resolves to the response.
 */
async function ipcFetcher(
    url: string,
    method: "GET" | "HEAD" | "POST" | "PUT" | "DELETE" | "CONNECT" | "OPTIONS" | "TRACE" | "PATCH" = "GET",
    body: unknown = undefined
): Promise<NsShared.IpcFetcherResponse> {
    const response = await ipcRenderer.invoke(
        "ipc::fetcher",
        {
            url,
            method,
            body
        }
    );

    return response;
}


contextBridge.exposeInMainWorld("ipcFetcher", ipcFetcher);
export type IpcFetcher = typeof ipcFetcher;