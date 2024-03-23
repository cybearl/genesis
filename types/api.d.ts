/**
 * Info returned by the `/api/app-info` route.
 */
export type ApiAppInfo = {
    name: string;
    version: string;
    environment: "development" | "production";
}

/**
 * Settings returned by the `/api/settings` route.
 */
export type ApiSettings = {
    theme: "light" | "dark";
    locale: string;
}

/**
 * System information returned by the `/api/sys-info` route.
 */
export type ApiSysInfo = {
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
}