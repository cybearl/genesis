import { IpcMainInvokeEvent, ipcMain } from "electron";

import apiInfoHandler from "@main/api/info";

import { IpcFetchRequest, IpcFetchResponse } from "../../types/shared";


/**
 * The ipcFetch API entry point used for the IPC communication
 * between the main and the renderer process.
 *
 * It redirects the request to the appropriate handler.
 */
export default function ipcHandler() {
    const entryPoint = async (event: IpcMainInvokeEvent, req: IpcFetchRequest): Promise<IpcFetchResponse> => {
        event.preventDefault();

        switch (req.url) {
            case "/api/info": {
                const res = await apiInfoHandler(event, req);
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