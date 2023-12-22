import { ReactNode, useContext } from "react";

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
        <div className={`${Inconsolata.className} relative w-full h-screen min-h-screen overflow-hidden bg-primary-900`}>
            {appStatus === "loading" && (
                <div className="absolute inset-0 h-full items-center flex justify-center">

                </div>
            )}

            <main className="w-full h-full z-0">
                {children}
            </main>
        </div>
    );
}
