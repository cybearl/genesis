const dotenv = require("dotenv");


dotenv.config({ path: ".env" });

module.exports = {
    mainSrcDir: "main",
    rendererSrcDir: "renderer",
    webpack: (config) => config
};