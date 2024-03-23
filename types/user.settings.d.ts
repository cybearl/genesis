/**
 * The user settings object for the application.
 */
export type UserSettings = {
    windows: {
        splashScreen: {
            width: number;
            height: number;
        };
        app: {
            initialWidth: number;
            initialHeight: number;
            minWidth: number;
            minHeight: number;
        };
    };
    interface: {
        background: {
            layerOneOpacity: number;
            layerOneBlur: number;
            layerTwoOpacity: number;
            layerTwoBlur: number;
        };
        mainFrame: {
            opacity: number;
        };
        sidebar: {
            opacity: number;
            blur: number;
            panel: {
                collapsedSize: number;
                expandedSize: number;
                transitionDuration: number;
                expandedTransitionDuration: number;
                collapsedTransitionDuration: number;
            };
        };
        statusBar: {
            opacity: number;
            blur: number;
        };
    };
    sysInfo: {
        refreshInterval: number;
    };
}