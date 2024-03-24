import {
    BrowserWindow,
    BrowserWindowConstructorOptions,
    Rectangle,
    screen
} from "electron";
import Store from "electron-store";

import { Window } from "@main/types/global";


/**
 * Create the main app window.
 * @param windowName The name of the window.
 * @param options The options for the window.
 * @returns The main app window.
 */
export default function createWindow(
    windowName: string,
    options: BrowserWindowConstructorOptions
): BrowserWindow {
    const storeName = `${windowName}_window`;
    const storeKey = "dimAndPos";
    const store = new Store<Rectangle>({ name: storeName });

    const defaultWindow: Window = {
        x: 0,
        y: 0,
        width: options.width || 1024,  // TODO: Implement via user preferences
        height: options.height || 768  // TODO: Implement via user preferences
    };

    const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    defaultWindow.x = (width - defaultWindow.width) / 2;
    defaultWindow.y = (height - defaultWindow.height) / 2;

    let _window = Object.assign({}, defaultWindow);


    /**
     * Checks if a window is within the bounds of the screen.
     * @param layout The window with its dimensions and position.
     * @param bounds The bounds of the screen.
     * @returns Whether the window is within the bounds of the screen or not.
     */
    const layoutWithinBounds = (window: Window, bounds: Window) => (
        window.x >= bounds.x &&
        window.y >= bounds.y &&
        window.x + window.width <= bounds.x + bounds.width &&
        window.y + window.height <= bounds.y + bounds.height
    );

    /**
     * Get the default position of the window (primary display center).
     * @returns The default position of the window.
     */
    const getWindowDefaultPosition = () => {
        const bounds = screen.getPrimaryDisplay().bounds;

        return Object.assign({}, defaultWindow, {
            x: (bounds.width - defaultWindow.width) / 2,
            y: (bounds.height - defaultWindow.height) / 2
        });
    };

    /**
     * Ensures that the window is within bounds of at least one screen.
     * @param windowDimensions The window frame.
     * @returns The window frame.
     */
    const ensureVisibleOnSomeDisplay = (windowDimensions: Window) => {
        const visible = screen.getAllDisplays().some((display) => layoutWithinBounds(windowDimensions, display.bounds));
        if (!visible) return getWindowDefaultPosition();
        return windowDimensions;
    };

    layout = ensureVisibleOnSomeDisplay(store.get(storeKey, defaultWindow));

    const browserWindow = new BrowserWindow({
        // Window information
        title: options.title,
        icon: options.icon,

        // Dimensions and position
        ...layout,

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

    /**
     * Gets the current dimensions and position of the window.
     * @returns The current dimensions and position of the window.
     */
    const getCurrentWindow = (): Window => {
        const position = win.getPosition();
        const size = win.getSize();

        return {
            x: position[0],
            y: position[1],
            width: size[0],
            height: size[1]
        };
    };


    browserWindow.on("close", () => {
        if (!browserWindow.isMinimized() && !browserWindow.isMaximized()) {
            Object.assign(layout, getCurrentWindow());
        }

        store.set(storeKey, layout);
    });

    return win;
};
