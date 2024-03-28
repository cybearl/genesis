import Store from "electron-store";

import defaultPreferences from "@main/lib/defaults/preferences.default";
import { Storage } from "@sharedTypes/storage";


/**
 * The storage manager class.
 */
export default class StorageService {
    private store: Store<Storage>;

    constructor() {
        this.store = new Store<Storage>({
            name: "storage",
            defaults: {
                windowStorage: {
                    main: {
                        initialized: false,
                        monitor: "",
                        x: 0,
                        y: 0,
                        width: 1024,
                        height: 768,
                        maximized: false
                    }
                },
                preferences: defaultPreferences
            }
        });
    }

    /**
     * Get a value from the storage.
     * @param key The key of the value to get.
     * @returns The value.
     */
    public get(key: keyof Storage): Storage[keyof Storage] | undefined {
        return this.store.get(key);
    }

    /**
     * Set a value in the storage.
     * @param key The key of the value to set.
     * @param value The value to set.
     */
    public set(key: keyof Storage, value: Storage[keyof Storage]): void {
        this.store.set(key, value);
    }
}
