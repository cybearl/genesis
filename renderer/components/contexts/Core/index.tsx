import { ReactNode, createContext, useEffect, useState } from "react";

import useInterval from "@/hooks/useInterval";
import { getAppLoadingStatus, updateAppLoadingStatus } from "@/lib/crud/appLoadingStatus";
import { AppLoadingStatus } from "@sharedTypes/api";


export type SidebarPanelState = "collapsing" | "collapsed" | "expanding" | "expanded";

type CoreContext = {
    // appInfo: ApiAppInfoReturnType | null;
    appLoadingStatus: AppLoadingStatus | undefined;
    sidebarPanelState: SidebarPanelState;
    setSidebarPanelState: (sidebarPanelState: SidebarPanelState) => void;
};

export const CoreContext = createContext({} as CoreContext);

export default function CoreProvider({ children }: { children: ReactNode; }) {
    // const [appInfo, setAppInfo] = useState<ApiAppInfoReturnType | null>(null);
    const [appLoadingStatus, setAppLoadingStatus] = useState<AppLoadingStatus>();
    const [sidebarPanelState, setSidebarPanelState] = useState<SidebarPanelState>("expanded");

    // useEffect(() => {
    //     const getStatus = async () => {
    //         const res = await getAppLoadingStatus();
    //         if (res) setAppLoadingStatus(res);
    //     };

    //     getStatus();
    // }, []);

    useInterval(async () => {
        const result = await updateAppLoadingStatus(10);
        if (result) {
            setAppLoadingStatus(result);

            // if (result.progress >= 100) 
        }
    }, 100);

    // TODO: Implement via settings
    // useEffect(() => {
    //     const getAppInfo = async () => {
    //         const res = await window.ipcBridge("/api/app-info");
    //         if (res.data) setAppInfo(res.data as ApiAppInfoReturnType);
    //     };

    //     getAppInfo();
    // }, []);

    const context = {
        // appInfo,
        appLoadingStatus,
        sidebarPanelState,
        setSidebarPanelState
    };

    return (
        <CoreContext.Provider value={context}>
            {children}
        </CoreContext.Provider>
    );
}