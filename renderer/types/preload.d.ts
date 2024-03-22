import { IpcBridge } from "@main/preload";


declare global {
    interface Window {
        ipcBridge: IpcBridge;
    }
}
