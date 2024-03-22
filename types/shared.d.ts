/**
 * The options passed to the incoming ipc request.
 * @param method The method to use (optional, defaults to `GET`).
 * @param headers The headers of the request (optional, defaults to `{}`).
 * @param body The body of the request (optional, defaults to `{}`).
 */
export interface IpcRequestOptions {
    method: "GET" | "POST" | "PATCH" | "DELETE";
    headers?: object;
    body?: object;
}

/**
 * Incoming ipc request.
 * @param url The ipc route url.
 * @param options The options to pass to the ipc bridge (optional, see `IpcRequestOptions` for default values).
 */
export interface IpcRequest {
    url: string;
    options?: IpcRequestOptions;
}

/**
 * Parsed ipc request with mandatory options merged with url.
 * @param url The ipc route url.
 * @param method The method to use (optional, defaults to `GET`).
 * @param headers The headers of the request (optional, defaults to `{}`).
 * @param query The query of the request (optional, defaults to `{}`).
 * @param body The body of the request (optional, defaults to `{}`).
 */
export interface ParsedIpcRequest {
    url: string;
    method: "GET" | "POST" | "PATCH" | "DELETE";
    headers?: object;
    query?: object;
    body?: object;
}

/**
 * Response from the ipc router.
 * @param status The status code of the response.
 * @param message The message of the response.
 * @param data The data of the response.
 */
export interface IpcResponse {
    status: number;
    message: string;
    data: object | null;
}

/**
 * ====================
 *   API SHARED TYPES
 * ====================
 */

/**
 * Info returned by the `/api/app-info` route.
 */
export interface SHR__AppInfo {
    name: string;
    version: string;
    environment: "development" | "production";
}

/**
 * Settings returned by the `/api/settings` route.
 */
export interface SHR__Settings {
    theme: "light" | "dark";
    locale: string;
}

/**
 * System information returned by the `/api/sys-info` route.
 */
export interface SHR__SysInfo {
    cpu: {
        percentage: string;
        str: string;
    },
    memory: {
        available: string;
        used: string;
        total: string;
        percentage: string;
        str: string;
    };
}