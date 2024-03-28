/**
 * The window storage object.
 */
export type WindowStorage = {
    initialized: boolean;
    monitor: string;
    x: number;
    y: number;
    width: number;
    height: number;
    maximized: boolean;
};

/**
 * The preferences object.
 */
export interface Preferences {
    window: {
        startMaximized: boolean;
        restoreCoordinates: boolean;
    },
    sysInfo: {
        refreshInterval: number;
    };
}

/**
 * The local storage object.
 */
export interface LocalStorage {
    lastSidebarState: "collapsed" | "expanded";
    lastOpenedPage: number;
}

/**
 * The main store object.
 */
export interface Storage {
    windowStorage: { [windowName: string]: WindowStorage; };
    preferences: Preferences;
    localStorage: LocalStorage;
}