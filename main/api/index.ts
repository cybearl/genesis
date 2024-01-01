import { ipcMain } from "electron";


/**
 * The main api entry point used for the IPC communication
 * between the main and the renderer process.
 */
export default function ipcHandler() {
    ipcMain.on("ping", async (_event, value) => {
        console.log(value);
        return "pong";
    });
}