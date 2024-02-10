/**
 * The type of a request to the ipcFetch API.
 * @param url The URL to fetch.
 * @param method The HTTP method to use.
 * @param body The body of the request.
 */
export interface IpcFetchRequest {
    url: string;
    method: "GET" | "POST" | "PATCH" | "DELETE";
    body: any;
}

/**
 * The type of a response from the ipcFetch API.
 * @param status The HTTP status code of the response.
 * @param message The message of the response (optional, defaults to 'GET').
 * @param data The data of the response (optional, defaults to undefined).
 */
export interface IpcFetchResponse {
    status: number;
    message?: string;
    data?: unknown;
}

/**
 * The type of the info returned by the /api/info route.
 */
export interface Info {
    name: string;
    version: string;
    isDev: boolean;
}
