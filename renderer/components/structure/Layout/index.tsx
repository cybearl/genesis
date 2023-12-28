import { ReactNode, useContext } from "react";

import Background from "@/components/base/Background";
import Logo from "@/components/base/Logo";
import { CoreContext } from "@/components/contexts/Core";
import { DebugContext } from "@/components/contexts/Debug";
import LoadingScreen from "@/components/general/LoadingScreen";
import Nav, { NavButton } from "@/components/structure/Nav";
import CONFIG from "@/configs/app.config";
import { Inconsolata } from "@/lib/fonts";


type LayoutProps = {
    children: ReactNode;
    navButtons: NavButton[];
    onNavButtonClick: (label: string) => void;
};

export default function Layout({
    children,
    navButtons,
    onNavButtonClick
}: LayoutProps) {
    const { appStatus } = useContext(CoreContext);
    const { debugValues } = useContext(DebugContext);

    return (
        <div className={`${Inconsolata.className} z-0 relative w-full h-screen min-h-screen overflow-hidden flex flex-col`}>
            <LoadingScreen isEnabled={appStatus !== "ready"} />

            <Background
                imgOpacity={1}
                imgBlur={0}
            />

            <main className="w-full flex-grow z-0 flex items-start justify-start">
                <Nav navButtons={navButtons} onNavButtonClick={onNavButtonClick} />

                <div className="w-full h-full px-2 py-4 bg-black bg-opacity-90">
                    {children}
                </div>
            </main>

            {process.env.NODE_ENV === "development" && (
                <div className="absolute right-4 top-3 flex flex-col gap-2 text-xs tracking-wider">
                    {Object.keys(debugValues).map((key) => (
                        <span key={key}>
                            <b>{key}</b>: {JSON.stringify(debugValues[key])}
                        </span>
                    ))}
                </div>
            )}

            <div className="absolute right-4 bottom-3 flex gap-2">
                <p className="flex flex-col font-semibold leading-none items-end justify-center pt-1 text-sm tracking-widest">
                    {CONFIG.appName}
                    <span className="text-xs text-neutral-500 font-medium">
                        {CONFIG.appVersion}
                    </span>
                </p>

                <Logo size="sm" />
            </div>
        </div>
    );
}
