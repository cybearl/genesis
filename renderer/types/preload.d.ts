import { IsWindowAPI } from "@main/preload";


declare global {
    interface Window {
        api: IsWindowAPI;
    }
}
