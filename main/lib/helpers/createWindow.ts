import path from "path";

import {
    BrowserWindow,
    BrowserWindowConstructorOptions,
    screen
} from "electron";

import { getEnvironment } from "@main/api/environment";
import StorageService from "@main/lib/helpers/storageService";
import { Storage } from "@sharedTypes/storage";


/**
 * Create a BrowserWindow instance with stored dimensions and coordinates.
 * @param storeName The name of the store.
 * @param windowName The name of the window.
 * @param isSplash Whether the window is a splash screen or not (prevent moving, resizing, etc.).
 * @param preloadScriptPath The path to the preload script.
 * @returns The BrowserWindow instance.
 */
export default async function createWindow(
    storage: StorageService,
    windowName: string,
    isSplash: boolean
) {
    const windowsStorage = storage.get("windowStorage") as Storage["windowStorage"] || {};
    const windowStorage = windowsStorage[windowName] || {};

    const preferences = storage.get("preferences") as Storage["preferences"];

    if (!preferences.window.restoreCoordinates ||
        Object.keys(windowStorage).length === 0 ||
        !windowStorage.initialized
    ) {
        const primaryDisplay = screen.getPrimaryDisplay();

        let width: number;
        if (isSplash) width = Math.round(primaryDisplay.workAreaSize.width / 4);
        else width = Math.round(primaryDisplay.workAreaSize.width / 2);
        const height = Math.round((width / 16) * 9);

        windowStorage.initialized = true;
        windowStorage.monitor = primaryDisplay.label;
        windowStorage.x = (primaryDisplay.workArea.width - width) / 2;
        windowStorage.y = (primaryDisplay.workArea.height - height) / 2;
        windowStorage.width = width;
        windowStorage.height = height;
        windowStorage.maximized = false;
    }

    // Environment API
    const environment = await getEnvironment();

    const options: BrowserWindowConstructorOptions = {
        title: environment.appName,
        x: windowStorage.x as number,
        y: windowStorage.y as number,
        width: windowStorage.width as number,
        height: windowStorage.height as number,
        minWidth: 1024,
        minHeight: 768,
        show: false,
        frame: !isSplash,
        movable: !isSplash,
        resizable: !isSplash,
        alwaysOnTop: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
            preload: path.join(__dirname, "preload.js")
        }
    };

    // Fixes an issue with the window resizing itself when moved if resizable is set to false
    // https://github.com/electron/electron/issues/13043
    if (isSplash) {
        options.minWidth = windowStorage.width as number;
        options.minHeight = windowStorage.height as number;
    }

    const win = new BrowserWindow(options);

    win.once("show", () => {
        // Focus the window when it's shown
        win.focus();

        if (!isSplash && (preferences.window.startMaximized || (preferences.window.restoreCoordinates && windowStorage.maximized))) {
            win.maximize();
        }
    });

    win.on("move", () => {
        // Prevent maximized windows from triggering the move event
        if (win.isMaximized()) return;

        const bounds = win.getBounds();
        windowStorage.x = bounds.x;
        windowStorage.y = bounds.y;
        windowStorage.monitor = screen.getDisplayMatching(bounds).label;
    });

    win.on("resize", () => {
        const bounds = win.getBounds();
        windowStorage.width = bounds.width;
        windowStorage.height = bounds.height;
    });

    win.on("maximize", () => windowStorage.maximized = true);
    win.on("unmaximize", () => windowStorage.maximized = false);

    win.on("close", () => {
        if (!isSplash && preferences.window.restoreCoordinates) {
            storage.set("windowStorage", {
                ...windowsStorage,
                [windowName]: windowStorage
            });
        }
    });

    return win;
}