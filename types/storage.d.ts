/**
 * Represents the coordinates of a window.
 */
export type WindowCoords = {
    x: number;
    y: number;
};

/**
 * Represents the dimensions of a window.
 */
export type WindowDimensions = {
    width: number;
    height: number;
};

/**
 * The user preferences object.
 */
export interface UserPreferences {
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
        sysInfo: {
            refreshInterval: number;
        };
    };
}

/**
 * The storage object.
 */
export interface Storage {
    windowPositions: {
        splashScreen: WindowCoords;
        app: WindowCoords;
    };
    windowDimensions: {
        splashScreen: WindowDimensions;
        app: WindowDimensions;
    };
    userPreferences: UserPreferences;
}