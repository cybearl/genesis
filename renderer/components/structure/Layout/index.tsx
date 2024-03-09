import { Memory, Speed } from "@mui/icons-material";
import { ReactNode, useContext, useState } from "react";

import Background from "@/components/base/Background";
import { NavButtonData } from "@/components/base/NavButton";
import { CoreContext } from "@/components/contexts/Core";
import LoadingApp from "@/components/general/LoadingApp";
import BottomBar from "@/components/structure/BottomBar";
import Nav from "@/components/structure/Nav";
import useInterval from "@/hooks/useInterval";
import { Inconsolata } from "@/lib/fonts";
import { SHR__SysInfo } from "@sharedTypes/shared";


type LayoutProps = {
    children: ReactNode;

    topNavButtons: NavButtonData[];
    bottomNavButtons: NavButtonData[];
    devOnlyNavButtons?: NavButtonData[];
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
    const { info, appStatus } = useContext(CoreContext);
    const [sysInfo, setSysInfo] = useState({} as SHR__SysInfo);

    useInterval(async () => {
        const res = await window.ipcFetch("/api/sysinfo");
        setSysInfo(res.data as SHR__SysInfo);
    }, 2000);

    return (
        <div className={`${Inconsolata.className} z-0 relative w-full h-screen min-h-screen overflow-hidden flex flex-col`}>
            <LoadingApp isEnabled={appStatus !== "ready"} />

            <Background
                imgOpacity={1}
                imgBlur={0}
            />

            <main className="w-full flex-grow z-0 flex items-start justify-start">
                <Nav
                    topNavButtons={topNavButtons}
                    bottomNavButtons={bottomNavButtons}
                    devOnlyNavButtons={info?.environment === "development" ? devOnlyNavButtons : []}
                    onNavButtonClick={onNavButtonClick}
                    activeNavButtonIndex={currentPage}
                />

                <div className="relative w-full h-full max-h-screen flex flex-col">
                    <div className="relative h-full scrollbar overflow-y-auto flex-grow bg-black bg-opacity-90">
                        {children}
                    </div>

                    <BottomBar
                        leftSideContent={[
                            <span key={0} title="Global CPU usage">
                                <Speed className="text-lg mr-1.5 mb-0.5" />
                                {sysInfo?.cpuPercentage}%
                            </span>,
                            <span key={1} title="Global memory usage">
                                <Memory className="text-lg mr-1.5 mb-0.5" />
                                {sysInfo?.memoryUsedInGB}/{sysInfo?.memoryTotalInGB} GB ({sysInfo?.memoryPercentage}%)
                            </span>
                        ]}
                        rightSideContent={[
                            <span key={0} title="Made by Cybearl | Yoratoni">
                                <span className="text-lg leading-[0]">©</span>
                                &nbsp;{new Date().getFullYear()} Cybearl
                            </span>
                        ]}
                    />
                </div>
            </main>
        </div>
    );
}
