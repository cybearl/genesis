import { ipcMain } from "electron";

import NsShared from "../../types/shared";


/**
 * The main Fetcher API entry point used for the IPC communication
 * between the main and the renderer process.
 */
export default function ipcHandler() {
    ipcMain.handle("api::fetcher", async (
        event: Electron.IpcMainInvokeEvent,
        request: NsShared.IsFetcherRequest
    ): Promise<NsShared.IsFetcherResponse> => {
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