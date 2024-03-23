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
}