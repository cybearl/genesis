import type { AppProps } from "next/app";
import "@/styles/globals.css";

import CoreProvider from "@/components/contexts/Core";


export default function App({ Component, pageProps }: AppProps) {
    return (
        <CoreProvider>
            <Component {...pageProps} />
        </CoreProvider>
    );
}