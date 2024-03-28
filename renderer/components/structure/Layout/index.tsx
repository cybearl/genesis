import { ReactNode, useContext, useState } from "react";

import Background from "@/components/base/Background";
import { SidebarButtonData } from "@/components/base/SidebarButton";
import ValueWithIcon from "@/components/base/ValueWithIcon";
import { CoreContext } from "@/components/contexts/Core";
import SplashScreen from "@/components/general/SplashScreen";
import Sidebar from "@/components/structure/Sidebar";
import StatusBar from "@/components/structure/StatusBar";
import StaticConfig from "@/lib/config/static.config";
import { SysInfo } from "@sharedTypes/api";


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
    const [sysInfo, setSysInfo] = useState<SysInfo>();

    const { appLoadingStatus, environment } = useContext(CoreContext);

    // TODO: Implement via preferences
    // useInterval(async () => {
    //     const res = await window.ipcBridge("/api/sys-info");
    //     setSysInfo(res.data as SysInfo);
    // }, AppConfig.sysInfo.refreshInterval);

    return (
        <div className="z-0 relative w-full h-screen min-h-screen overflow-hidden flex flex-col">
            <Background
                layerOneOpacity={StaticConfig.opacities.backgroundLayerOne}
                layerOneBlur={StaticConfig.blurs.backgroundLayerOne}
                layerTwoOpacity={StaticConfig.opacities.backgroundLayerTwo}
                layerTwoBlur={StaticConfig.blurs.backgroundLayerTwo}
            />

            <SplashScreen
                isEnabled={
                    appLoadingStatus?.currentWindow === "splash-screen" ||
                    !appLoadingStatus?.loaded
                }
            />

            <main className="w-full flex-grow z-0 flex items-start justify-start">
                <Sidebar
                    topButtons={sidebar.topButtons}
                    bottomButtons={sidebar.bottomButtons}
                    devOnlyButtons={environment?.env ? sidebar.devOnlyButtons : []}
                    onButtonClick={onSidebarButtonClick}
                    activeButtonIndex={currentPage}
                />

                <div className="relative w-full h-full max-h-screen flex flex-col">
                    <div className="relative h-full scrollbar overflow-y-auto flex-grow bg-transparent">
                        <div
                            className="-z-10 absolute inset-0 bg-primary-750"
                            style={{ opacity: StaticConfig.opacities.mainFrame }}
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
