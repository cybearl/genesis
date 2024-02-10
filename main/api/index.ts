import { ipcMain } from "electron";

import NsShared from "../../types/shared";


/**
 * The ipcFetch API entry point used for the IPC communication
 * between the main and the renderer process.
 *
 * It redirects the request to the appropriate handler.
 */
export default function ipcHandler() {
    ipcMain.handle("ipc::fetch", async (
        event: Electron.IpcMainInvokeEvent,
        request: NsShared.IpcFetchRequest
    ): Promise<NsShared.IpcFetchResponse> => {
        event.preventDefault();

        switch (request.url) {
            default: {
                return {
                    status: 404,
                    message: "Not Found"
                };
            }
        }
    });
}