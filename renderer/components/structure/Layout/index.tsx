import { ReactNode, useContext } from "react";

import Background from "@/components/base/Background";
import LoadingScreen from "@/components/base/LoadingScreen";
import { CoreContext } from "@/components/contexts/Core";
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
            <Background />

            {appStatus === "loading" ? (
                <LoadingScreen />
            ) : (
                <>
                    <main className="w-full flex-grow z-0 p-4 flex items-start justify-start flex-col">
                        {children}
                    </main>

                    <footer className="w-full z-0">
                        <Nav />
                    </footer>
                </>
            )}
        </div>
    );
}
