const dotenv = require("dotenv");


// dotenv.config({ path: ".env" });

console.log(process.env.NODE_ENV);

/** @type {import("next").NextConfig} */
module.exports = {
    reactStrictMode: true,
    swcMinify: true,
    trailingSlash: true,
    images: { unoptimized: true },
    webpack: (config) => {
        // Find the DefinePlugin for the existing environment variables
        config.plugins.forEach((plugin) => {
            if (plugin.definitions && plugin.definitions.__NEXT_DEFINE_ENV) {
                // Adds environment variables from .env file (shared by main and renderer processes)
                // Without overriding existing ones

                // Parse .env file
                const env = dotenv.config({ path: ".env" }).parsed;

                // Filter only those starting with "NEXT_PUBLIC_"
                const sharedEnv = Object.keys(env)
                    .filter((key) => key.startsWith("NEXT_PUBLIC_"))
                    .reduce((obj, key) => {
                        obj[`process.env.${ key }`] = env[key];
                        return obj;
                    }, {});

                plugin.definitions = {
                    ...plugin.definitions,
                    ...sharedEnv
                };
            }

            return plugin;
        });

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
