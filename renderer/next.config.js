const dotenv = require("dotenv");


/** @type {import("next").NextConfig} */
module.exports = {
    reactStrictMode: true,
    swcMinify: true,
    trailingSlash: true,
    images: { unoptimized: true },
    webpack: (config) => {
        const existingEnv = config.plugins[1].definitions;

        // Adds environment variables from .env file (shared by main and renderer processes)
        // Without overriding existing ones
        if (existingEnv?.__NEXT_DEFINE_ENV === "true") {
            // Parse .env file
            const env = dotenv.config({ path: ".env" }).parsed;

            // Filter only those starting with "NEXT_PUBLIC_"
            const sharedEnv = Object.keys(env)
                .filter((key) => key.startsWith("NEXT_PUBLIC_"))
                .reduce((obj, key) => {
                    obj[key] = env[key];
                    return obj;
                }, {});

            config.plugins[1].definitions = {
                ...existingEnv,
                ...sharedEnv
            };
        }

        return config;
    },
    async redirects() {
        return [
            {
                source: "/home",
                destination: "/",
                permanent: true
            }
        ];
    }
};
