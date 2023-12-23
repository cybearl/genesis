/** @type {import("tailwindcss").Config} */
module.exports = {
    content: [
        "./renderer/pages/**/*.{js,ts,jsx,tsx}",
        "./renderer/components/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    100: "#F3D6FF",
                    200: "#E7ADFF",
                    300: "#DA85FF",
                    400: "#CE5CFF",
                    500: "#C233FF",
                    600: "#B60AFF",
                    700: "#9D00E0",
                    800: "#8100B8",
                    900: "#64008F",
                    1000: "#470066",
                    1100: "#2B003D",
                    1200: "#0E0014"
                }
            }
        }
    },
    plugins: []
};