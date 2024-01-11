import { contextBridge, ipcRenderer } from "electron";

import NsShared from "@sharedTypes/shared";


async function fetcher(
    url: string,
    method: "GET" | "HEAD" | "POST" | "PUT" | "DELETE" | "CONNECT" | "OPTIONS" | "TRACE" | "PATCH" = "GET",
    body: unknown = undefined
): Promise<NsShared.IsFetcherResponse> {
    const response = await ipcRenderer.invoke(
        "fetcher",
        {
            url,
            method,
            body
        }
    );

    return response;
}


contextBridge.exposeInMainWorld("fetcher", fetcher);
export type IsFetcher = typeof fetcher;