/**
 * A shared namespace for types used for both the main and renderer processes.
 */

export interface IpcFetchRequest {
    url: string;
    method: "GET" | "POST" | "PATCH" | "DELETE";
    body: unknown;
}

export interface IpcFetchResponse {
    status: number;
    message?: string;
    data?: unknown;
}

export interface AppInfo {
    name: string;
    version: string;
    isDev: boolean;
}
