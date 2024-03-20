import plugin from "tailwindcss/plugin";


/** @type {import("tailwindcss").Config} */
module.exports = {
    content: [
        "./renderer/pages/**/*.{js,ts,jsx,tsx}",
        "./renderer/components/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            fontFamily: {
                "roboto-mono": ["var(--font-roboto-mono)"]
            },
            colors: {
                primary: {
                    100: "#E5DCFD",
                    200: "#CAB9FA",
                    300: "#B79FF9",
                    400: "#A385F7",
                    500: "#9573F5",
                    600: "#8365D7",
                    700: "#7057B8",
                    800: "#4B3A7B",
                    900: "#261D3E",
                    950: "#130F1F"
                },
                secondary: {
                    50: "#404855",
                    100: "#23272e",
                    200: "#1e2227",
                    300: "#1c1f25",
                    400: "#191b20",
                    500: "#15171c",
                    600: "#121417",
                    700: "#0e1012",
                    750: "#0b0d0f",
                    800: "#0a0c0e",
                    850: "#090a0c",
                    900: "#070809",
                    950: "#030405"
                }
            },
            keyframes: {
                "opacity-pulse": {
                    "0%": { opacity: 1 },
                    "50%": { opacity: 0 },
                    "100%": { opacity: 1 }
                },
                "opacity-in": {
                    "0%": { opacity: 0 },
                    "100%": { opacity: 1 }
                },
                "opacity-out": {
                    "0%": { opacity: 1 },
                    "100%": { opacity: 0 }
                }
            },
            animation: {
                "opacity-pulse": "opacity-pulse 2.5s ease-in-out infinite",
                "opacity-in": "opacity-in 0.5s ease-in-out forwards",
                "opacity-out": "opacity-out 0.5s ease-in-out forwards"
            }
        }
    },
    plugins: [
        require("tailwindcss-animate"),
        // Adding child variants
        plugin(({ addVariant }) => {
            addVariant("child", "& > *");
            addVariant("child-hover", "& > *:hover");
            addVariant("child-focus", "& > *:focus");
            addVariant("child-active", "& > *:active");
        })
    ]
};