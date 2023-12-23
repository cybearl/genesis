import { ReactNode, useContext } from "react";

import Background from "@/components/base/Background";
import { CoreContext } from "@/components/contexts/Core";
import { Inconsolata } from "@/lib/fonts";


type LayoutProps = {
    children: ReactNode;
};

export default function Layout({
    children
}: LayoutProps) {
    const { appStatus } = useContext(CoreContext);

    return (
        <div className={`${Inconsolata.className} relative w-full h-screen min-h-screen overflow-hidden`}>
            <Background />

            {appStatus === "loading" && (
                <div
                    className="absolute inset-0 h-full items-center flex justify-center"
                    onClick={(e) => e.preventDefault()}
                >

                </div>
            )}

            <main className="w-full h-full z-0">
                {children}
            </main>
        </div>
    );
}
