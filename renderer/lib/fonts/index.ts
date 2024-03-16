import localFont from "next/font/local";


export const Inconsolata = localFont({
    variable: "--font-inconsolata",
    src: [
        {
            path: "../../public/static/fonts/Inconsolata/Inconsolata-ExtraLight.ttf",
            weight: "200",
            style: "normal"
        },
        {
            path: "../../public/static/fonts/Inconsolata/Inconsolata-Light.ttf",
            weight: "300",
            style: "normal"
        },
        {
            path: "../../public/static/fonts/Inconsolata/Inconsolata-Regular.ttf",
            weight: "400",
            style: "normal"
        },
        {
            path: "../../public/static/fonts/Inconsolata/Inconsolata-Medium.ttf",
            weight: "500",
            style: "normal"
        },
        {
            path: "../../public/static/fonts/Inconsolata/Inconsolata-SemiBold.ttf",
            weight: "600",
            style: "normal"
        },
        {
            path: "../../public/static/fonts/Inconsolata/Inconsolata-Bold.ttf",
            weight: "700",
            style: "normal"
        },
        {
            path: "../../public/static/fonts/Inconsolata/Inconsolata-ExtraBold.ttf",
            weight: "800",
            style: "normal"
        },
        {
            path: "../../public/static/fonts/Inconsolata/Inconsolata-Black.ttf",
            weight: "900",
            style: "normal"
        }
    ]
});