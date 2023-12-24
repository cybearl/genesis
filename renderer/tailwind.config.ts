/** @type {import("tailwindcss").Config} */
module.exports = {
    content: [
        "./renderer/pages/**/*.{js,ts,jsx,tsx}",
        "./renderer/components/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            colors: {

            },
            keyframes: {
                "opacity-pulse": {
                    "0%": { opacity: 1 },
                    "50%": { opacity: 0 },
                    "100%": { opacity: 1 }
                }
            },
            animation: {
                "opacity-pulse": "opacity-pulse 2.5s ease-in-out infinite"
            }
        }
    },
    plugins: [
        require("tailwindcss-animate")
    ]
};