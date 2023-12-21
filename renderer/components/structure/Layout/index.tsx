import { ReactNode } from "react";

import TitleBar from "@/components/structure/TitleBar";


type LayoutProps = {
    children: ReactNode;
};

export default function Layout({
    children
}: LayoutProps) {
    return (
        <div className="relative w-full h-screen min-h-screen overflow-hidden">
            <TitleBar />

            <main className="w-full h-full">
                {children}
            </main>
        </div>
    );
}