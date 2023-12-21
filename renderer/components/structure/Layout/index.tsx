import { ReactNode } from "react";


type LayoutProps = {
    children: ReactNode;
};

export default function Layout({
    children
}: LayoutProps) {
    return (
        <div className="relative w-full h-screen min-h-screen overflow-hidden">
            <main className="w-full h-full">
                {children}
            </main>
        </div>
    );
}