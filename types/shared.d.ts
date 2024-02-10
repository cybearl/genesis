/**
 * A shared namespace for types used for both the main and renderer processes.
 */
declare namespace NsShared {
    interface IpcFetcherRequest {
        url: string;
        method: "GET" | "HEAD" | "POST" | "PUT" | "DELETE" | "CONNECT" | "OPTIONS" | "TRACE" | "PATCH";
        body: unknown;
    }

    interface IpcFetcherResponse {
        status: number;
        message?: string;
        data?: unknown;
    }

    interface AppInfo {
        name: string;
        version: string;
        isDev: boolean;
    }
}


export default NsShared;