/**
 * The settings object for the application.
 */
export type ShrSettings = {
    environment: "development" | "production";
    app: {
        producer: string;
        name: string;
        version: string;
        description: string;
        disclaimer: string;
    };
    window: {
        title: string;
        initialWidth: number;
        initialHeight: number;
        minWidth: number;
        minHeight: number;
    };
    interface: {
        loadingScreen: {
            layerOneOpacity: number;
            layerOneBlur: number;
            layerTwoOpacity: number;
            layerTwoBlur: number;
        };
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