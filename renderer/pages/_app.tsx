import type { AppProps } from "next/app";
import "@/styles/globals.css";

import CoreProvider from "@/components/contexts/Core";
import DebugProvider from "@/components/contexts/Debug";


export default function App({ Component, pageProps }: AppProps) {
    return (
        <CoreProvider>
            <DebugProvider>
                <Component {...pageProps} />
            </DebugProvider>
        </CoreProvider>
    );
}