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
                    100: "#F5EDE0",
                    200: "#EBDBC1",
                    300: "#E1C9A3",
                    400: "#D7B784",
                    500: "#CDA565",
                    600: "#C39346",
                    700: "#A97E37",
                    800: "#8B672D",
                    900: "#6C5023"
                }
            }
        }
    },
    plugins: []
};