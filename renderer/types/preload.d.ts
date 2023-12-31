import { IpcHandler } from "@main/preload";


declare global {
    interface Window {
        api: IpcHandler;
    }
}
