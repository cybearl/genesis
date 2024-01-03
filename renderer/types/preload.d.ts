import { IsWindowAPI } from "@main/preload";


declare global {
    interface AppInfo {
        name: string;
        version: string;
        isPackaged: boolean;
    }

    interface Window {
        api: IsWindowAPI;
    }
}
