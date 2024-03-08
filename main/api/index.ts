import { IpcMainInvokeEvent } from "electron";

import apiInfoHandler from "@main/api/info";
import apiNotifierHandler from "@main/api/notifier";
import { getQueryParams } from "@main/helpers/apiUtils";

import { FetchRequest, FetchResponse, RawFetchRequest } from "../../types/shared";


/**
 * The IPC router (entry point used for the IPC communication
 * between the main and the renderer process) redirects
 * the request to the appropriate API endpoint.
 */
export default async function ipcRouter(
    event: IpcMainInvokeEvent,
    req: RawFetchRequest
): Promise<FetchResponse> {
    event.preventDefault();

    // Convert the raw fetch request to a FetchRequest
    // useable by the API handlers
    const fetchRequest: FetchRequest = {
        url: req.url,
        method: req.options?.method || "GET",
        headers: req.options?.headers || {},
        query: getQueryParams(req.url),
        body: req.options?.body
    };

    console.log("fetchRequest", fetchRequest);

    switch (req.url) {
        case "/api/info": {
            const res = await apiInfoHandler(fetchRequest);
            return res;
        }
        case "/api/notifier": {
            const res = await apiNotifierHandler(fetchRequest);
            return res;
        }
        default: {
            return {
                status: 404,
                message: "Not Found"
            };
        }
    }
}