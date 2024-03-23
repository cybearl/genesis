import path from "path";

import { app, ipcMain } from "electron";
import serve from "electron-serve";

import ipcRouter from "@main/api/routes";
// import defaultWindowConfig from "@main/configs/window.config";
import createSplashScreen from "@main/lib/helpers/createSplashScreen";
import createWindow from "@main/lib/helpers/createWindow";


// Handle storage location
if (app.isPackaged) serve({ directory: "app" });
else app.setPath("userData", `${app.getPath("userData")} (development)`);

// Handle the application lifecycle
app.on("ready", async () => {
    const splashScreen = createSplashScreen({
        title: "Genesis",
        icon: path.join(__dirname, "..", "assets", "favicon.ico"),
        webPreferences: {
            preload: path.join(__dirname, "preload.js")
        }
    });


    // const mainWindow = createWindow("main", {
    //     // TODO: Implement via settings
    //     // title: defaultWindowConfig.title,
    //     // width: defaultWindowConfig.initialWidth,
    //     // height: defaultWindowConfig.initialHeight,
    //     // minWidth: defaultWindowConfig.minWidth,
    //     // minHeight: defaultWindowConfig.minHeight,
    //     icon: path.join(__dirname, "..", "assets", "favicon.ico"),
    //     webPreferences: {
    //         preload: path.join(__dirname, "preload.js")
    //     }
    // });

    // // Disable the default menu bar
    // mainWindow.setMenuBarVisibility(false);

    // Load the application
    if (app.isPackaged) {
        await splashScreen.loadURL("app://./home");
    } else {
        const port = process.argv[2];
        await splashScreen.loadURL(`http://localhost:${port}/home`);
    }

    // // Load the application
    // if (app.isPackaged) {
    //     await mainWindow.loadURL("app://./home");
    // } else {
    //     const port = process.argv[2];
    //     await mainWindow.loadURL(`http://localhost:${port}/home`);
    // }
});

// Handle the application closing cycle
app.on("window-all-closed", () => {

});

// Handle IPC routing
ipcMain.handle("ipc::router", ipcRouter);