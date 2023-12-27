import { ReactNode, useContext } from "react";

import Background from "@/components/base/Background";
import { CoreContext } from "@/components/contexts/Core";
import { DebugContext } from "@/components/contexts/Debug";
import LoadingScreen from "@/components/general/LoadingScreen";
import Nav from "@/components/structure/Nav";
import { Inconsolata } from "@/lib/fonts";


type LayoutProps = {
    children: ReactNode;
};

export default function Layout({
    children
}: LayoutProps) {
    const { appStatus } = useContext(CoreContext);
    const { debugValues } = useContext(DebugContext);

    return (
        <div className={`${Inconsolata.className} z-0 relative w-full h-screen min-h-screen overflow-hidden flex flex-col`}>
            <LoadingScreen isEnabled={true} />

            <Background />

            {process.env.NODE_ENV === "development" && (
                <div className="absolute right-4 top-3 flex flex-col gap-2 text-xs tracking-wider">
                    {Object.keys(debugValues).map((key) => (
                        <span key={key}>
                            <b>{key}</b>: {JSON.stringify(debugValues[key])}
                        </span>
                    ))}
                </div>
            )}

            <main className="w-full flex-grow z-0 flex items-start justify-start flex-col">
                <Nav />

                {children}
            </main>
        </div>
    );
}
