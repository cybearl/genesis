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
        function addVariants({ addVariant }: { addVariant: (name: string, variant: string) => void }) {
            addVariant("child", "& > *");
            addVariant("child-hover", "& > *:hover");
        }
    ]
};