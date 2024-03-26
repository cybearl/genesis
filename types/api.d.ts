/**
 * Multiple information about the app loading status returned
 * by the `/api/app-loading-status` route.
 */
export type AppLoadingStatus = {
    currentWindow: "splash-screen" | "main-window" | "none";
    loaded: boolean;
    progress: number;
    stream: string;
};

/**
 * The environment object for the app.
 */
export type Environment = {
    environment: "production" | "development";
    appName: string;
    appStage: "pre-alpha" | "alpha" | "beta" | "rc" | "stable";
    appVersion: string;
    appIcon: string;
    appPath: string;
};

/**
 * Notification request object.
 */
export type NotifierRequest = {
    title?: string;
    message: string;
    icon?: string;  // Defaults to Genesis logo
    sound?: boolean;  // Only Notification Center or Windows Toasters
};

/**
 * System information returned by the `/api/sys-info` route.
 */
export type SysInfo = {
    cpu: {
        percentage: string;
        str: string;
    },
    memory: {
        available: string;
        used: string;
        total: string;
        percentage: string;
        str: string;
    };
};