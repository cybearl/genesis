import Store from "electron-store";


import defaultUserPreferences from "@main/lib/storage/user.preferences";
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
                windowPositions: {
                    splashScreen: {
                        x: 0,
                        y: 0
                    },
                    app: {
                        x: 0,
                        y: 0
                    }
                },
                windowDimensions: {
                    splashScreen: {
                        width: 0,
                        height: 0
                    },
                    app: {
                        width: 0,
                        height: 0
                    }
                },
                userPreferences: defaultUserPreferences
            }
        });
    }

    /**
     * Get a value from the storage.
     * @param key The key of the value to get.
     * @returns The value.
     */
    public get(key: keyof Storage): Storage[keyof Storage] {
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
