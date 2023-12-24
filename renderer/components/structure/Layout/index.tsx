import { ReactNode, useContext } from "react";

import Background from "@/components/base/Background";
import { CoreContext } from "@/components/contexts/Core";
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

    return (
        <div className={`${Inconsolata.className} z-0 relative w-full h-screen min-h-screen overflow-hidden flex flex-col`}>
            <LoadingScreen hidden={appStatus === "ready"} />

            <Background />

            <main className="w-full flex-grow z-0 flex items-start justify-start flex-col">
                <Nav />

                {children}
            </main>
        </div>
    );
}
