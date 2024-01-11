import { IsFetcher } from "@main/preload";


declare global {
    interface Window {
        fetcher: IsFetcher;
    }
}
