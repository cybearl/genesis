/**
 * The options passed to the API endpoint.
 * @param method The HTTP method to use (optional, defaults to `GET`).
 * @param headers The headers of the request (optional, defaults to `{}`).
 * @param body The body of the request (optional, defaults to `{}`).
 */
export interface RawFetchRequestOptions {
    method: "GET" | "POST" | "PATCH" | "DELETE";
    headers?: object;
    body?: object;
}

/**
 * The type of a request to the fetch API.
 * @param url The URL to fetch.
 * @param options The options to pass to the fetch API (optional, see `RawFetchRequestOptions` for default values).
 */
export interface RawFetchRequest {
    url: string;
    options?: RawFetchRequestOptions;
}

/**
 * FetchRequest with mandatory options merged with url, simulating the behavior
 * of the original NextJS fetch endpoint function.
 * @param url The URL to fetch.
 * @param method The HTTP method to use (optional, defaults to `GET`).
 * @param headers The headers of the request (optional, defaults to `{}`).
 * @param query The query of the request (optional, defaults to `{}`).
 * @param body The body of the request (optional, defaults to `{}`).
 */
export interface FetchRequest {
    url: string;
    method: "GET" | "POST" | "PATCH" | "DELETE";
    headers?: object;
    query?: object;
    body?: object;
}

/**
 * The type of a response from the fetch API.
 * @param status The HTTP status code of the response.
 * @param message The message of the response.
 * @param data The data of the response.
 */
export interface FetchResponse {
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
 * The type of the info returned by the /api/info route.
 */
export interface SHR__Info {
    name: string;
    version: string;
    environment: "development" | "production";
}

/**
 * The type of the system information returned by the /api/sysinfo route.
 */
type SHR__SysInfo = {
    cpuPercentage: string;
    memoryUsedInGB: string;
    memoryTotalInGB: string;
    memoryPercentage: string;
};
