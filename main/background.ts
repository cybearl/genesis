import { BrowserWindow, app, ipcMain } from "electron";
import serve from "electron-serve";

import ipcRouter from "@main/api/routes";
import createWindow from "@main/lib/helpers/createWindow";
import StorageService from "@main/lib/helpers/storageService";


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
    splashScreen = await createWindow(storage, "splash", true);
    mainWindow = await createWindow(storage, "main", false);

    // Load the app
    if (app.isPackaged) {
        await splashScreen.loadURL("app://./home");
        await mainWindow.loadURL("app://./home");
    } else {
        const port = process.argv[2];
        await splashScreen.loadURL(`http://localhost:${port}/home`);
        await mainWindow.loadURL(`http://localhost:${port}/home`);
    }
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