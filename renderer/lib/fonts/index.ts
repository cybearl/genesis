import localFont from "next/font/local";


export const Inconsolata = localFont({
    src: [
        {
            path: "../../public/static/fonts/Inconsolata/Inconsolata-ExtraLight.ttf",
            weight: "200"
        },
        {
            path: "../../public/static/fonts/Inconsolata/Inconsolata-Light.ttf",
            weight: "300"
        },
        {
            path: "../../public/static/fonts/Inconsolata/Inconsolata-Regular.ttf",
            weight: "400"
        },
        {
            path: "../../public/static/fonts/Inconsolata/Inconsolata-Medium.ttf",
            weight: "500"
        },
        {
            path: "../../public/static/fonts/Inconsolata/Inconsolata-SemiBold.ttf",
            weight: "600"
        },
        {
            path: "../../public/static/fonts/Inconsolata/Inconsolata-Bold.ttf",
            weight: "700"
        },
        {
            path: "../../public/static/fonts/Inconsolata/Inconsolata-ExtraBold.ttf",
            weight: "800"
        },
        {
            path: "../../public/static/fonts/Inconsolata/Inconsolata-Black.ttf",
            weight: "900"
        }
    ]
});