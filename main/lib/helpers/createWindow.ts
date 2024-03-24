import {
    BrowserWindow,
    BrowserWindowConstructorOptions,
    Rectangle,
    screen
} from "electron";
import Store from "electron-store";


/**
 * Create a BrowserWindow instance with stored dimensions and coordinates.
 * @param storeName The name of the store.
 * @param windowName The name of the window.
 * @param isSplash Whether the window is a splash screen or not (prevent moving, resizing, etc.).
 * @returns The BrowserWindow instance.
 */
export default function createWindow(
    storeName: string,
    windowName: string,
    isSplash: boolean
): BrowserWindow {
    const store = new Store<Rectangle>({ name: storeName });
    const storeKeys = { coordinates: "coordinates", dimensions: "dimensions" };

    const win = new BrowserWindow({
        // Window information
        title: options.title,
        icon: options.icon,




        // Window behavior options
        show: false,
        minWidth: options.minWidth,
        minHeight: options.minHeight,

        // Web preferences
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            ...options.webPreferences
        }
    });


    return win;
}