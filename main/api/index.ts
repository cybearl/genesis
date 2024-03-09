import { IpcMainInvokeEvent } from "electron";

import apiInfoHandler from "@main/api/info";
import apiNotifierHandler from "@main/api/notifier";
import apiSysInfoHandler from "@main/api/sysinfo";
import { parseQueryFromUrl } from "@main/utils/api";

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

    // Convert the raw fetch request to a FetchRequest useable by the API handlers
    // ex: `req.options?.url` query parameters goes into `req.query`
    // ex: `req.options?.body` becomes `req.body`
    // etc..
    const fetchRequest: FetchRequest = {
        url: req.url,
        method: req.options?.method || "GET",
        headers: req.options?.headers || {},
        query: parseQueryFromUrl(req.url),
        body: req.options?.body
    };

    switch (req.url) {
        case "/api/config": {

        }
        case "/api/info": {
            const res = await apiInfoHandler(fetchRequest);
            return res;
        }
        case "/api/notifier": {
            const res = await apiNotifierHandler(fetchRequest);
            return res;
        }
        case "/api/sysinfo": {
            const res = await apiSysInfoHandler(fetchRequest);
            return res;
        }
        default: {
            return {
                status: 404,
                message: "Not Found",
                data: null
            };
        }
    }
}