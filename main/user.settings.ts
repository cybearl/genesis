import { UserSettings } from "@sharedTypes/user.settings";


/**
 * The default settings applied to the user's application
 * at initial startup.
 */
const defaultUserSettings: UserSettings = {
    windows: {
        splashScreen: {
            width: 480,
            height: 320
        },
        app: {
            initialWidth: 1024,
            initialHeight: 768,
            minWidth: 1024,
            minHeight: 768
        }
    },
    interface: {
        background: {
            layerOneOpacity: 0.1,
            layerOneBlur: 0,
            layerTwoOpacity: 0.5,
            layerTwoBlur: 0
        },
        mainFrame: {
            opacity: 0.9
        },
        sidebar: {
            opacity: 0.9,
            blur: 6,
            panel: {
                collapsedSize: 56,
                expandedSize: 300,
                transitionDuration: 300,
                expandedTransitionDuration: 2.5,
                collapsedTransitionDuration: 0.6
            }
        },
        statusBar: {
            opacity: 0.9,
            blur: 6
        }
    },
    sysInfo: {
        refreshInterval: 1500
    }
};

export default defaultUserSettings;