const AppConfig = {
    appProducer: "CYBEARL",
    appName: "Genesis",
    appVersion: "1.0.0",
    appDescription: `
        WELCOME TO THE DEVELOPMENT EDITION OF GENESIS, AN ADVANCED CRYPTO TRADING TOOLBOX.
    `,
    appDisclaimer: `
        THIS SOFTWARE IS FOR EDUCATIONAL PURPOSES ONLY. DO NOT RISK MONEY WHICH YOU ARE AFRAID TO LOOSE.
        USE THE SOFTWARE AT YOUR OWN RISK. THE AUTHORS ASSUME NO RESPONSIBILITY FOR YOUR TRADING RESULTS.
    `,

    loadingScreen: {
        layerOneOpacity: 0.02,
        layerOneBlur: 0,
        layerTwoOpacity: 0,
        layerTwoBlur: 0
    },

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
            expandedSize: 270,
            transitionDuration: 300,
            minLabelLength: 16,
            expandedTransitionDuration: 2.5,
            collapsedTransitionDuration: 0.6
        }
    },

    statusBar: {
        opacity: 0.9,
        blur: 6
    },

    sysInfo: {
        refreshInterval: 1500
    }
};

export default AppConfig;