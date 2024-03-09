import { IpcMainInvokeEvent } from "electron";

import apiInfoHandler from "@main/api/info";
import apiNotifierHandler from "@main/api/notifier";
import apiSettingsHandler from "@main/api/settings";
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

    let res: FetchResponse;

    switch (req.url) {
        case "/api/info": {
            res = await apiInfoHandler(fetchRequest);
            break;
        }
        case "/api/notifier": {
            res = await apiNotifierHandler(fetchRequest);
            break;
        }
        case "/api/settings": {
            res = await apiSettingsHandler(fetchRequest);
            break;
        }
        case "/api/sysinfo": {
            res = await apiSysInfoHandler(fetchRequest);
            break;
        }
        default: {
            return {
                status: 404,
                message: "Not Found",
                data: null
            };
        }
    }

    return res;
}