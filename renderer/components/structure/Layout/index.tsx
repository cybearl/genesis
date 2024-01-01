import { ReactNode, useContext } from "react";

import Background from "@/components/base/Background";
import Logo from "@/components/base/Logo";
import { IsNavButton } from "@/components/base/NavButton";
import { CoreContext } from "@/components/contexts/Core";
import LoadingScreen from "@/components/general/LoadingScreen";
import BottomBar from "@/components/structure/BottomBar";
import Nav from "@/components/structure/Nav";
import CONFIG from "@/configs/app.config";
import { Inconsolata } from "@/lib/fonts";


type LayoutProps = {
    children: ReactNode;

    navButtons: IsNavButton[];
    onNavButtonClick: (index: number) => void;
    currentPage: number;
};

export default function Layout({
    children,
    navButtons,
    onNavButtonClick,
    currentPage
}: LayoutProps) {
    const { appStatus } = useContext(CoreContext);

    return (
        <div className={`${Inconsolata.className} z-0 relative w-full h-screen min-h-screen overflow-hidden flex flex-col`}>
            <LoadingScreen isEnabled={appStatus !== "ready"} />

            <Background
                imgOpacity={1}
                imgBlur={0}
            />

            <main className="w-full flex-grow z-0 flex items-start justify-start">
                <Nav
                    navButtons={navButtons}
                    onNavButtonClick={onNavButtonClick}
                    currentPage={currentPage}
                />

                <div className="w-full h-full flex flex-col">
                    <div className="relative w-full flex-grow px-2 py-4 bg-black bg-opacity-90">
                        {children}

                        <div className="absolute right-2.5 bottom-2 flex gap-1">

                            <p className="flex flex-col font-semibold leading-[16px] justify-center items-end pt-1 text-base tracking-widest">
                                {CONFIG.appName}
                                <span className="text-sm text-neutral-500 font-medium tracking-wide">
                                    v{CONFIG.appVersion}
                                </span>
                            </p>

                            <Logo size="sm" />
                        </div>
                    </div>

                    <BottomBar
                        leftSideContent={[
                            "test"
                        ]}
                        rightSideContent={[
                            "test"
                        ]}
                    />
                </div>
            </main>
        </div>
    );
}
