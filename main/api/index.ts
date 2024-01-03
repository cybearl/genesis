import { app, ipcMain } from "electron";

import NsShared from "../../types/shared";


/**
 * The main API entry point used for the IPC communication
 * between the main and the renderer process.
 */
export default function ipcHandler() {
    // Exposes the app information to the renderer process
    ipcMain.handle("app::info", async (): Promise<NsShared.AppInfo> => ({
        name: app.getName(),
        version: app.getVersion(),
        isPackaged: app.isPackaged
    }));
}