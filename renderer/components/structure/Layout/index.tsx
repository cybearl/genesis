import { Icon } from "@iconify/react";
import { ReactNode, useContext, useState } from "react";

import Background from "@/components/base/Background";
import { SidebarButtonData } from "@/components/base/SidebarButton";
import { CoreContext } from "@/components/contexts/Core";
import LoadingScreen from "@/components/general/LoadingScreen";
import Sidebar from "@/components/structure/Sidebar";
import StatusBar from "@/components/structure/StatusBar";
import AppConfig from "@/configs/app.config";
import useInterval from "@/hooks/useInterval";
import { SHR__SysInfo } from "@sharedTypes/shared";


type LayoutProps = {
    children: ReactNode;

    topSidebarButtons: SidebarButtonData[];
    bottomSidebarButtons: SidebarButtonData[];
    devOnlySidebarButtons?: SidebarButtonData[];
    onSidebarButtonClick: (index: number) => void;
    currentPage: number;
};

export default function Layout({
    children,
    topSidebarButtons,
    bottomSidebarButtons,
    devOnlySidebarButtons = [],
    onSidebarButtonClick,
    currentPage
}: LayoutProps) {
    const { info, appStatus } = useContext(CoreContext);
    const [sysInfo, setSysInfo] = useState<SHR__SysInfo>();

    useInterval(async () => {
        const res = await window.ipcFetch("/api/sysinfo");
        setSysInfo(res.data as SHR__SysInfo);
    }, AppConfig.sysInfo.refreshInterval);

    return (
        <div className="z-0 relative w-full h-screen min-h-screen overflow-hidden flex flex-col">
            <Background
                imgOpacity={1}
                imgBlur={AppConfig.background.blur}
            />

            <LoadingScreen isEnabled={appStatus !== "ready"} />

            <main className="w-full flex-grow z-0 flex items-start justify-start">
                <Sidebar
                    topSidebarButtons={topSidebarButtons}
                    bottomSidebarButtons={bottomSidebarButtons}
                    devOnlySidebarButtons={info?.environment === "development" ? devOnlySidebarButtons : []}
                    onSidebarButtonClick={onSidebarButtonClick}
                    activeSidebarButtonIndex={currentPage}
                />

                <div className="relative w-full h-full max-h-screen flex flex-col">
                    <div className="relative h-full scrollbar overflow-y-auto flex-grow bg-transparent">
                        <div
                            className="-z-10 absolute inset-0 bg-secondary-700"
                            style={{
                                opacity: AppConfig.background.opacity
                            }}
                        />
                        {children}
                    </div>

                    <StatusBar
                        leftSideContent={[
                            <span key={0} title="System CPU usage" className="flex justify-center items-center">
                                <Icon icon="material-symbols:speed-outline-rounded" className="text-lg mr-1.5" />
                                {sysInfo ? sysInfo.cpu.str : "..."}
                            </span>,
                            <span key={1} title="System memory usage" className="flex justify-center items-center">
                                <Icon icon="material-symbols:memory-outline-rounded" className="text-lg mr-1" />
                                {sysInfo ? sysInfo.memory.str : "..."}
                            </span>
                        ]}
                        rightSideContent={[]}
                    />
                </div>
            </main>
        </div>
    );
}
