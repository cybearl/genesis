/**
 * A shared namespace for types used for both the main and renderer processes.
 */
declare namespace NsShared {
    interface IpcFetchRequest {
        url: string;
        method: "GET" | "POST" | "PATCH" | "DELETE";
        body: unknown;
    }

    interface IpcFetchResponse {
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