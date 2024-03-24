import path from "path";

import {
    BrowserWindow,
    BrowserWindowConstructorOptions,
    Rectangle,
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
): Promise<BrowserWindow> {
    const savedWindowCoordinates = storage.get("windowCoordinates") as Storage["windowCoordinates"] || {};
    const savedWindowDimensions = storage.get("windowDimensions") as Storage["windowDimensions"] || {};

    const window: Rectangle = {
        x: savedWindowCoordinates[windowName]?.x || 0,
        y: savedWindowCoordinates[windowName]?.y || 0,
        width: savedWindowDimensions[windowName]?.width || 1024,
        height: savedWindowDimensions[windowName]?.height || 768
    };

    /**
     * Get the default coordinates of the window (primary display center).
     * @returns The default coordinates of the window.
     */
    const getDefaultWindowCoordinates = () => {
        const { width, height } = screen.getPrimaryDisplay().workAreaSize;

        return {
            x: (width - window.width) / 2,
            y: (height - window.height) / 2
        };
    };

    /**
     * Checks if a window is within the bounds of the screen.
     * @param window The window with its dimensions and coordinates.
     * @param bounds The bounds of the screen.
     * @returns Whether the window is within the bounds of the screen or not.
     */
    const isWithinBounds = (window: Rectangle, bounds: Rectangle) => (
        window.x >= bounds.x &&
        window.y >= bounds.y &&
        window.x + window.width <= bounds.x + bounds.width &&
        window.y + window.height <= bounds.y + bounds.height
    );

    /**
     * Ensure that the window is visible on at least one screen.
     * @param window The window to check.
     * @returns Whether the window is visible on at least one display or not.
     */
    const isVisibleOnAtLeastOneDisplay = (window: Rectangle) => {
        const displays = screen.getAllDisplays();
        return displays.some(display => isWithinBounds(window, display.bounds));
    };

    // Reset to default coordinates in case of invalid coordinates
    if ((window.x === 0 && window.y === 0) || !isVisibleOnAtLeastOneDisplay(window)) {
        const defaultCoordinates = getDefaultWindowCoordinates();
        window.x = defaultCoordinates.x;
        window.y = defaultCoordinates.y;
    }

    // Environment API
    const environment = await getEnvironment();

    const options: BrowserWindowConstructorOptions = {
        title: environment.appName,
        x: window.x,
        y: window.y,
        width: window.width,
        height: window.height,
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

    const win = new BrowserWindow(options);

    // Save on close
    win.on("close", () => {
        const coordinates = win.getPosition();
        const size = win.getSize();

        storage.set("windowCoordinates", {
            ...savedWindowCoordinates,
            [windowName]: {
                x: coordinates[0],
                y: coordinates[1]
            }
        });

        storage.set("windowDimensions", {
            ...savedWindowDimensions,
            [windowName]: {
                width: size[0],
                height: size[1]
            }
        });
    });

    return win;
}