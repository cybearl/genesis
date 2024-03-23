import { BrowserWindow, BrowserWindowConstructorOptions, screen } from "electron";

import { Window } from "@main/types/global";


export default function createSplashScreen(
    options: BrowserWindowConstructorOptions
): BrowserWindow {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;

    const defaultWindow: Window = {
        x: 0,
        y: 0,
        width: 0,
        height: 0
    };

    // 4/3 of the screen size centered
    defaultWindow.width = width / 4;
    defaultWindow.height = height / 3;
    defaultWindow.x = (width - defaultWindow.width) / 2;
    defaultWindow.y = (height - defaultWindow.height) / 2;

    // Create the splash screen window
    const splashScreen = new BrowserWindow({
        title: options.title,
        width: defaultWindow.width,
        height: defaultWindow.height,
        x: defaultWindow.x,
        y: defaultWindow.y,
        icon: options.icon,
        frame: false,
        resizable: false,
        movable: false,
        minimizable: false,
        maximizable: false,
        alwaysOnTop: true,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            ...options.webPreferences
        }
    });

    // Show the splash screen when ready
    splashScreen.once("ready-to-show", () => {
        splashScreen.show();
    });

    return splashScreen;
}