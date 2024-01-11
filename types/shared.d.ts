/**
 * A shared namespace for types used for both the main and renderer processes.
 */
declare namespace NsShared {
    interface IsFetcherRequest {
        url: string;
        method: "GET" | "HEAD" | "POST" | "PUT" | "DELETE" | "CONNECT" | "OPTIONS" | "TRACE" | "PATCH";
        body: unknown;
    }

    interface IsFetcherResponse {
        status: number;
        message?: string;
        data?: unknown;
    }

    interface IsAppInfo {
        name: string;
        version: string;
        isDev: boolean;
    }
}


export default NsShared;