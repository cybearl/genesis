import { IpcFetcher } from "@main/preload";


declare global {
    interface Window {
        ipcFetcher: IpcFetcher;
    }
}
