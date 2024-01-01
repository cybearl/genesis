import { ipcMain } from "electron";


export default function ipcHandler() {
    ipcMain.on("ping", async (_event, value) => {
        console.log(value);
        return "pong";
    });
}