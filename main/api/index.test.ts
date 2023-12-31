import { ipcMain } from "electron";


export default function handler() {
    ipcMain.on("ping", async (_event, value) => {
        console.log(value);
        return "pong";
    });
}