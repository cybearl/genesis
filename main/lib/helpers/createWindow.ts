import {
    BrowserWindow,
    BrowserWindowConstructorOptions,
    Rectangle,
    screen
} from "electron";
import Store from "electron-store";

import { Window } from "@main/types/global";
// import defaultWindowConfig from "@main/configs/window.config";


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
    const defaultWindow: Window = {
        x: 0,
        y: 0,
        width: options.width || 1024,  // TODO: Implement via settings
        height: options.height || 768  // TODO: Implement via settings
    };

    // Sets the default X and Y coordinates of the window to the center of the screen
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    defaultWindow.x = (width - defaultWindow.width) / 2;
    defaultWindow.y = (height - defaultWindow.height) / 2;

    // State defaults to the default window state
    let state = Object.assign({}, defaultWindow);

    // Create the store for the window
    const storeName = `${windowName}_window`;
    const storeKey = "state";
    const store = new Store<Rectangle>({ name: storeName });

    /**
     * Gets the current position of the window.
     * @returns The current position of the window.
     */
    const getCurrentPosition = (): Window => {
        const position = win.getPosition();
        const size = win.getSize();

        return {
            x: position[0],
            y: position[1],
            width: size[0],
            height: size[1]
        };
    };

    /**
     * Checks if the window is within the bounds of the screen.
     * @param windowState The window state.
     * @param bounds The bounds of the screen.
     * @returns Whether the window is within the bounds of the screen.
     */
    const windowWithinBounds = (windowState: Window, bounds: Window) => (
        windowState.x >= bounds.x &&
        windowState.y >= bounds.y &&
        windowState.x + windowState.width <= bounds.x + bounds.width &&
        windowState.y + windowState.height <= bounds.y + bounds.height
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
     * Ensures that the window is visible on some display.
     * @param windowState The window state.
     * @returns The window state.
     */
    const ensureVisibleOnSomeDisplay = (windowState: Window) => {
        const visible = screen.getAllDisplays().some((display) => windowWithinBounds(windowState, display.bounds));

        if (!visible) {
            const windowDefaultPosition = getWindowDefaultPosition();
            return windowDefaultPosition;
        }

        return windowState;
    };

    /**
     * Saves the current state of the window.
     */
    const saveState = () => {
        if (!win.isMinimized() && !win.isMaximized()) {
            Object.assign(state, getCurrentPosition());
        }

        store.set(storeKey, state);
    };

    state = ensureVisibleOnSomeDisplay(
        store.get(storeKey, defaultWindow)
    );

    const win = new BrowserWindow({
        show: false,
        title: options.title,
        minWidth: options.minWidth,
        minHeight: options.minHeight,
        icon: options.icon,
        ...state,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            ...options.webPreferences
        }
    });

    win.on("close", saveState);

    return win;
};
