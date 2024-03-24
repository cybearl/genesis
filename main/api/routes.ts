import { IpcMainInvokeEvent } from "electron";

import apiAppLoadingStatusHandler from "@main/api/app-loading-status";
import apiEnvironmentHandler from "@main/api/environment";
import apiNotifierHandler from "@main/api/notifier";
import apiSysInfoHandler from "@main/api/sys-info";
import apiUserPreferencesHandler from "@main/api/user-preferences";
import { parseQueryFromUrl } from "@main/lib/utils/api";
import ERRORS from "@main/lib/utils/errors";
// import logger from "@main/lib/utils/logger";
import { IpcRequest, IpcResponse, ParsedIpcRequest } from "@sharedTypes/ipc";


/**
 * The ipc router redirects the incoming requests
 * to the appropriate handler (route) based on the request URL.
 * @param event The ipc event.
 * @param req The ipc request.
 * @returns The response from the handler.
 */
export default async function ipcRouter(
    event: IpcMainInvokeEvent,
    req: IpcRequest
): Promise<IpcResponse> {
    event.preventDefault();
    // logger.silly(`IPC request sent to '${req.url}'.`);

    // Parse the ipc request, making it easier to work with in the handlers.
    // ex: `req.options?.url` query parameters goes into `req.query`
    // ex: `req.options?.body` becomes `req.body`
    // etc..
    const parsedIpcRequest: ParsedIpcRequest = {
        url: req.url,
        method: req.options?.method || "GET",
        headers: req.options?.headers || {},
        query: parseQueryFromUrl(req.url),
        body: req.options?.body
    };

    let res: IpcResponse;

    switch (req.url) {
        case "/api/app-loading-status": {
            res = await apiAppLoadingStatusHandler(parsedIpcRequest);
            break;
        }
        case "/api/environment": {
            res = await apiEnvironmentHandler(parsedIpcRequest);
            break;
        }
        case "/api/notifier": {
            res = await apiNotifierHandler(parsedIpcRequest);
            break;
        }
        case "/api/sys-info": {
            res = await apiSysInfoHandler(parsedIpcRequest);
            break;
        }
        case "/api/user-preferences": {
            res = await apiUserPreferencesHandler(parsedIpcRequest);
            break;
        }
        default: {
            return {
                success: false,
                message: "Ipc route not found.",
                data: ERRORS.NOT_FOUND
            };
        }
    }

    return res;
}
