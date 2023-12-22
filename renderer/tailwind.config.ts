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
                    50: "#60586C",
                    100: "#453C54",
                    200: "#2A203B",
                    300: "#231834",
                    400: "#1B102D",
                    500: "#130826",
                    600: "#0F0423",
                    700: "#0B001F",
                    800: "#090018",
                    900: "#060010"
                }
            }
        }
    },
    plugins: []
};