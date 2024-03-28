import { Preferences } from "@sharedTypes/storage";


/**
 * The default preferences applied at first startup.
 */
const defaultPreferences: Preferences = {
    window: {
        startMaximized: false,
        restoreCoordinates: true
    },
    sysInfo: {
        refreshInterval: 1500
    }
};

export default defaultPreferences;