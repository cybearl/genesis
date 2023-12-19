import {
    BrowserWindow,
    BrowserWindowConstructorOptions,
    Rectangle,
    screen
} from "electron";
import Store from "electron-store";

import defaultWindowConfig from "@main/configs/window.config";


type IsWindow = {
    x: number;
    y: number;
    width: number;
    height: number;
};

export const createWindow = (
    windowName: string,
    options: BrowserWindowConstructorOptions
): BrowserWindow => {
    const defaultWindow: IsWindow = {
        x: 0,
        y: 0,
        width: options.width || defaultWindowConfig.initialWidth,
        height: options.height || defaultWindowConfig.initialHeight
    };

    // Sets the default X and Y coordinates of the window to the center of the screen
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    defaultWindow.x = (width - defaultWindow.width) / 2;
    defaultWindow.y = (height - defaultWindow.height) / 2;

    // State defaults to the default window state
    let state = Object.assign({}, defaultWindow);

    // Create the store for the window
    const storeName = `${windowName} Window`;
    const storeKey = "state";
    const store = new Store<Rectangle>({ name: storeName });

    /**
     * Gets the current position of the window.
     * @returns The current position of the window.
     */
    const getCurrentPosition = (): IsWindow => {
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
    const windowWithinBounds = (windowState: IsWindow, bounds: IsWindow) => (
        windowState.x >= bounds.x &&
        windowState.y >= bounds.y &&
        windowState.x + windowState.width <= bounds.x + bounds.width &&
        windowState.y + windowState.height <= bounds.y + bounds.height
    );

    /**
     * Resets the window to the default position.
     * @returns The default position of the window.
     */
    const resetToDefaults = () => {
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
    const ensureVisibleOnSomeDisplay = (windowState: IsWindow) => {
        const visible = screen.getAllDisplays().some((display) => windowWithinBounds(windowState, display.bounds));

        if (!visible) {
            return resetToDefaults();
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
        title: options.title,
        minWidth: options.minWidth,
        minHeight: options.minHeight,
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
