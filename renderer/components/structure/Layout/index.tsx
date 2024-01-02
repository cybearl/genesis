import { ReactNode, useContext, useEffect, useRef, useState } from "react";

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
    onNavButtonClick: (index: number) => void;
    currentPage: number;
};

export default function Layout({
    children,
    topNavButtons,
    bottomNavButtons,
    onNavButtonClick,
    currentPage
}: LayoutProps) {
    const { appStatus } = useContext(CoreContext);

    const limitedHeightContainerRef = useRef<HTMLDivElement>(null);
    const childrenContainerRef = useRef<HTMLDivElement>(null);

    const [logoRightOffset, setLogoRightOffset] = useState("10px");

    useEffect(() => {
        const limitedHeightContainer = limitedHeightContainerRef.current;
        const childrenContainer = childrenContainerRef.current;

        if (limitedHeightContainer && childrenContainer) {
            const limitedHeightContainerHeight = limitedHeightContainer.clientHeight;
            const childrenContainerHeight = childrenContainer.clientHeight;

            console.log(limitedHeightContainerHeight, childrenContainerHeight);

            if (childrenContainerHeight > limitedHeightContainerHeight) {
                setLogoRightOffset("26px");
            } else {
                setLogoRightOffset("10px");
            }
        }
    }, [childrenContainerRef, limitedHeightContainerRef, currentPage]);

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
                    onNavButtonClick={onNavButtonClick}
                    activeNavButtonIndex={currentPage}
                />

                <div className="relative w-full h-full max-h-screen flex flex-col">
                    <div ref={limitedHeightContainerRef} className="relative h-full scrollbar overflow-y-auto flex-grow px-4 py-3 bg-black bg-opacity-90">
                        <div ref={childrenContainerRef} className="min-h-max">
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
