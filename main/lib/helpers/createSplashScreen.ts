import { BrowserWindow, BrowserWindowConstructorOptions, screen } from "electron";

import { AspectRatios } from "@main/lib/utils/units";
import { WindowFrame } from "@main/types/global";


export default function createSplashScreen(
    options: BrowserWindowConstructorOptions
): BrowserWindow {
    const dimensions: WindowFrame = {
        x: 0,
        y: 0,
        width: 0,
        height: 0
    };

    const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    dimensions.width = Math.round(width / 4);
    dimensions.height = Math.round(dimensions.width / AspectRatios["16:9"]);
    dimensions.x = Math.round((width - dimensions.width) / 2);
    dimensions.y = Math.round((height - dimensions.height) / 2);

    // Create the splash screen window
    const splashScreen = new BrowserWindow({
        // Window information
        title: options.title,
        icon: options.icon,
        alwaysOnTop: true,

        // Dimensions and position
        ...dimensions,

        // Window behavior options
        show: false,
        frame: false,
        resizable: false,
        movable: false,
        minimizable: false,
        maximizable: false,

        // Web preferences
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