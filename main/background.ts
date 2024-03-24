import { BrowserWindow, app, ipcMain } from "electron";
import serve from "electron-serve";

import ipcRouter from "@main/api/routes";
import StorageService from "@main/lib/storage";


// Storage location
if (app.isPackaged) serve({ directory: "app" });
else app.setPath("userData", `${app.getPath("userData")} (development)`);

// Initialize storage
const storage = new StorageService();

// Windows
let splashScreen: BrowserWindow;
let mainWindow: BrowserWindow;

// Lifecycle
app.on("ready", async () => {

    // // Load the application
    // if (app.isPackaged) {
    //     await mainWindow.loadURL("app://./home");
    // } else {
    //     const port = process.argv[2];
    //     await mainWindow.loadURL(`http://localhost:${port}/home`);
    // }
});

// Closing cycle
app.on("window-all-closed", () => {

});

// IPC routing
ipcMain.handle("ipc::router", ipcRouter);

// Make initialized storage and window instances available globally
export {
    storage,
    splashScreen,
    mainWindow
};