import { IpcMainInvokeEvent, ipcMain } from "electron";

import apiInfoHandler from "@main/api/info";
import apiNotifierHandler from "@main/api/notifier";
import { getQueryParams } from "@main/helpers/apiUtils";

import { FetchRequest, FetchResponse, RawFetchRequest } from "../../types/shared";


/**
 * The ipcFetch API entry point used for the IPC communication
 * between the main and the renderer process.
 *
 * It redirects the request to the appropriate handler.
 */
export default function ipcHandler() {
    const entryPoint = async (event: IpcMainInvokeEvent, req: RawFetchRequest): Promise<FetchResponse> => {
        event.preventDefault();

        // Get the query parameters from the URL
        const query = getQueryParams(req.url);

        // Convert the raw fetch request to a FetchRequest
        const fetchRequest: FetchRequest = {
            url: req.url,
            method: req.options?.method || "GET",
            headers: req.options?.headers || {},
            query: query,
            body: req.options?.body
        };

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
    };

    ipcMain.handle("ipc::fetch", entryPoint);
}