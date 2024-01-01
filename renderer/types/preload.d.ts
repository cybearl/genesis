import { IsWindowApi } from "@main/preload";


declare global {
    interface Window {
        api: IsWindowApi;
    }
}
