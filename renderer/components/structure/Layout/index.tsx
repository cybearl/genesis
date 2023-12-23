import { ReactNode, useContext } from "react";

import Background from "@/components/base/Background";
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
        <div className={`${Inconsolata.className} relative w-full h-screen min-h-screen overflow-hidden flex flex-col`}>
            <Background />

            <header className="w-full z-0">
                <Nav />
            </header>

            {appStatus === "loading" && (
                <div
                    className="absolute z-20 inset-0 w-full h-full items-center flex justify-center"
                    onClick={(e) => e.preventDefault()}
                >

                </div>
            )}

            <main className="w-full flex-grow z-0 p-4 flex items-start justify-start flex-col">
                {children}
            </main>
        </div>
    );
}
