import { ReactNode, useContext, useState } from "react";

import Background from "@/components/base/Background";
import { SidebarButtonData } from "@/components/base/SidebarButton";
import ValueWithIcon from "@/components/base/ValueWithIcon";
import { CoreContext } from "@/components/contexts/Core";
import LoadingScreen from "@/components/general/LoadingScreen";
import Sidebar from "@/components/structure/Sidebar";
import StatusBar from "@/components/structure/StatusBar";
import AppConfig from "@/configs/app.config";
import useInterval from "@/hooks/useInterval";
import { SHR__SysInfo } from "@sharedTypes/shared";


type SidebarObj = {
    topButtons: SidebarButtonData[];
    bottomButtons: SidebarButtonData[];
    devOnlyButtons?: SidebarButtonData[];
};

type LayoutProps = {
    children: ReactNode;

    sidebar: SidebarObj;
    onSidebarButtonClick: (index: number) => void;

    currentPage: number;
};

export default function Layout({
    children,

    sidebar,
    onSidebarButtonClick,

    currentPage
}: LayoutProps) {
    const { appInfo, appStatus } = useContext(CoreContext);
    const [sysInfo, setSysInfo] = useState<SHR__SysInfo>();

    useInterval(async () => {
        const res = await window.ipcBridge("/api/sys-info");
        setSysInfo(res.data as SHR__SysInfo);
    }, AppConfig.sysInfo.refreshInterval);

    return (
        <div className="z-0 relative w-full h-screen min-h-screen overflow-hidden flex flex-col">
            <Background
                layerOneOpacity={AppConfig.background.layerOneOpacity}
                layerOneBlur={AppConfig.background.layerOneBlur}
                layerTwoOpacity={AppConfig.background.layerTwoOpacity}
                layerTwoBlur={AppConfig.background.layerTwoBlur}
            />

            <LoadingScreen isEnabled={appStatus !== "ready"} />

            <main className="w-full flex-grow z-0 flex items-start justify-start">
                <Sidebar
                    topButtons={sidebar.topButtons}
                    bottomButtons={sidebar.bottomButtons}
                    devOnlyButtons={appInfo?.environment === "development" ? sidebar.devOnlyButtons : []}
                    onButtonClick={onSidebarButtonClick}
                    activeButtonIndex={currentPage}
                />

                <div className="relative w-full h-full max-h-screen flex flex-col">
                    <div className="relative h-full scrollbar overflow-y-auto flex-grow bg-transparent">
                        <div
                            className="-z-10 absolute inset-0 bg-secondary-750"
                            style={{ opacity: AppConfig.mainFrame.opacity }}
                        />

                        {children}
                    </div>

                    <StatusBar
                        leftSideContent={[
                            <ValueWithIcon
                                key={0}
                                title="System CPU usage"
                                icon="material-symbols:speed-outline-rounded"
                                value={sysInfo?.cpu.str}
                                isLoading={!sysInfo}
                            />,
                            <ValueWithIcon
                                key={1}
                                title="System memory usage"
                                icon="material-symbols:memory-outline-rounded"
                                value={sysInfo?.memory.str}
                                isLoading={!sysInfo}
                            />
                        ]}
                        rightSideContent={[]}
                    />
                </div>
            </main>
        </div>
    );
}
