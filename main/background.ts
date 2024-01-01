import path from "path";

import { config } from "dotenv";
import { app } from "electron";
import serve from "electron-serve";

import ipcHandler from "@main/api/index";
import defaultWindowConfig from "@main/configs/window.config";
import { createWindow } from "@main/helpers/createWindow";


// Load environment variables from .env file (shared between main and renderer processes)
config({ path: ".env" });

// Determine whether we are running in production or development mode
const isProd = process.env.NODE_ENV === "production";

if (isProd) {
    serve({ directory: "app" });
} else {
    app.setPath("userData", `${app.getPath("userData")} (development)`);
}

(async () => {
    await app.whenReady();

    const mainWindow = createWindow("Main", {
        title: defaultWindowConfig.title,
        width: defaultWindowConfig.initialWidth,
        height: defaultWindowConfig.initialHeight,
        minWidth: defaultWindowConfig.minWidth,
        minHeight: defaultWindowConfig.minHeight,
        icon: path.join(__dirname, "..", "assets", "favicon.ico"),
        webPreferences: {
            preload: path.join(__dirname, "preload.js")
        }
    });

    // Disable the default menu bar
    mainWindow.setMenuBarVisibility(false);

    // Load the application
    if (isProd) {
        await mainWindow.loadURL("app://./home");
    } else {
        const port = process.argv[2];
        await mainWindow.loadURL(`http://localhost:${port}/home`);
    }
})();

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

ipcHandler();