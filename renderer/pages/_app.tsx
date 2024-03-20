import type { AppProps } from "next/app";
import "@/styles/globals.css";
import "@/styles/scrollbar.css";

import CoreProvider from "@/components/contexts/Core";
import { RobotoMono } from "@/lib/fonts";


export default function App({ Component, pageProps }: AppProps) {
    return (
        <div className={`${RobotoMono.variable} font-roboto-mono`}>
            <CoreProvider>
                <Component {...pageProps} />
            </CoreProvider>
        </div>
    );
}