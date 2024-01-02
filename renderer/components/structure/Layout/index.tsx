import { ReactNode, useContext, useEffect, useRef, useState } from "react";

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
                    navButtons={navButtons}
                    onNavButtonClick={onNavButtonClick}
                    currentPage={currentPage}
                />

                <div className="relative w-full h-full max-h-screen flex flex-col">
                    <div ref={limitedHeightContainerRef} className="relative h-full scrollbar overflow-y-auto flex-grow px-4 py-3 bg-black bg-opacity-90">
                        <div ref={childrenContainerRef} className="min-h-max">
                            {children}
                        </div>
                    </div>

                    <div
                        className="absolute bottom-[40px] flex gap-1 items-center justify-center"
                        style={{
                            right: logoRightOffset
                        }}
                    >
                        <p className="flex flex-col font-semibold leading-[16px] justify-center items-end pt-0.5 text-sm tracking-widest">
                            {CONFIG.appName}
                            <span className="text-xs text-neutral-500 font-medium tracking-wide">
                                v{CONFIG.appVersion}
                            </span>
                        </p>

                        <Logo size="sm" />
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
