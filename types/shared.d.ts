/**
 * A shared namespace for types used for both the main and renderer processes.
 */
declare namespace NsShared {
    type AvailableFetcherUrls = "/api/"

    interface IsFetcherResponse {
        status: number;
        message?: string;
        data: unknown;
    }

    interface IsAppInfo {
        name: string;
        version: string;
        isDev: boolean;
    }
}


export default NsShared;