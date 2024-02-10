import { IpcFetch } from "@main/preload";


declare global {
    interface Window {
        ipcFetch: IpcFetch;
    }
}
