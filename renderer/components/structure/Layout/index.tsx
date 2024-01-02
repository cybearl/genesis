import { ReactNode, useContext } from "react";

import Background from "@/components/base/Background";
import { IsNavButton } from "@/components/base/NavButton";
import { CoreContext } from "@/components/contexts/Core";
import LoadingScreen from "@/components/general/LoadingScreen";
import BottomBar from "@/components/structure/BottomBar";
import Nav from "@/components/structure/Nav";
import CONFIG from "@/configs/app.config";
import { Inconsolata } from "@/lib/fonts";


type LayoutProps = {
    children: ReactNode;

    topNavButtons: IsNavButton[];
    bottomNavButtons: IsNavButton[];
    devOnlyNavButtons?: IsNavButton[];
    onNavButtonClick: (index: number) => void;
    currentPage: number;
};

export default function Layout({
    children,
    topNavButtons,
    bottomNavButtons,
    devOnlyNavButtons = [],
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
                    topNavButtons={topNavButtons}
                    bottomNavButtons={bottomNavButtons}
                    devOnlyNavButtons={devOnlyNavButtons}
                    onNavButtonClick={onNavButtonClick}
                    activeNavButtonIndex={currentPage}
                />

                <div className="relative w-full h-full max-h-screen flex flex-col">
                    <div className="relative h-full scrollbar overflow-y-auto flex-grow px-4 py-3 bg-black bg-opacity-90">
                        <div className="min-h-max">
                            {children}
                        </div>
                    </div>

                    <BottomBar
                        leftSideContent={[
                            <span key={0}>
                                {CONFIG.appName} v{CONFIG.appVersion}
                            </span>
                        ]}
                        rightSideContent={[
                            <span key={0}>
                                <span className="text-lg leading-[0]">
                                    ©
                                </span>
                                &nbsp;{new Date().getFullYear()} Cybearl
                            </span>
                        ]}
                    />
                </div>
            </main>
        </div>
    );
}
