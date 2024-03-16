import { Head, Html, Main, NextScript } from "next/document";

import { Inconsolata } from "@/lib/fonts";


export default function Document() {
    return (
        <Html lang="en">
            <Head />
            <body className={`${Inconsolata.variable} font-inconsolata`}>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}