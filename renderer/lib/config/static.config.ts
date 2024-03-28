/**
 * A static TS configuration file for the renderer process.
 */
const StaticConfig = {
    opacities: {
        backgroundLayerOne: 0.1,
        backgroundLayerTwo: 0.5,
        mainFrame: 0.9,
        sidebar: 0.9,
        statusBar: 0.9
    },
    blurs: {
        backgroundLayerOne: 0,
        backgroundLayerTwo: 0,
        sidebar: 6,
        statusBar: 6
    },
    transitionDurations: {
        sidebar: {
            normal: 300,            // 0.3s
            expanded: 2.5,          // A multiplier for the normal duration (expanded duration = normal duration * expanded)
            collapsed: 0.6          // A multiplier for the normal duration (collapsed duration = normal duration * collapsed)
        }
    },
    dimensions: {
        sidebar: {
            collapsed: 56,
            expanded: 300
        }
    }
};

export default StaticConfig;