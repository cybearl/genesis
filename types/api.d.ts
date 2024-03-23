/**
 * Multiple information about the app loading status returned
 * by the `/api/app-loading-status` route.
 */
export type AppLoadingStatus = {
    frontend: {
        loaded: boolean;
        progress: number;
        stream: string;
    };
    backend: {
        loaded: boolean;
        progress: number;
        stream: string;
    };
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

/**
 * Notification request object.
 */
export type NotifierRequest = {
    title?: string;
    message: string;
    icon?: string;  // Defaults to Genesis logo
    sound?: boolean;  // Only Notification Center or Windows Toasters
};