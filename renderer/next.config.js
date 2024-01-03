/** @type {import("next").NextConfig} */
module.exports = {
    reactStrictMode: true,
    swcMinify: true,
    trailingSlash: true,
    images: { unoptimized: true },
    webpack: (config) => config,
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
