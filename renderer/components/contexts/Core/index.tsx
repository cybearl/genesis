import { ReactNode, createContext, useEffect, useState } from "react";

import { ShrAppInfo } from "@sharedTypes/api";


export type AppStatus = "loading" | "ready";
export type SidebarPanelState = "collapsing" | "collapsed" | "expanding" | "expanded";

type CoreContext = {
    appInfo: ShrAppInfo | null;
    appStatus: AppStatus;
    setAppStatus: (appStatus: AppStatus) => void;
    sidebarPanelState: SidebarPanelState;
    setSidebarPanelState: (sidebarPanelState: SidebarPanelState) => void;
};

export const CoreContext = createContext({} as CoreContext);

export default function CoreProvider({ children }: { children: ReactNode; }) {
    const [appInfo, setAppInfo] = useState<ShrAppInfo | null>(null);
    const [appStatus, setAppStatus] = useState<AppStatus>("ready");
    const [sidebarPanelState, setSidebarPanelState] = useState<SidebarPanelState>("expanded");

    useEffect(() => {
        const getAppInfo = async () => {
            const res = await window.ipcBridge("/api/app-info");
            if (res.data) setAppInfo(res.data as ShrAppInfo);
        };

        getAppInfo();
    }, []);

    const context = {
        appInfo,
        appStatus,
        setAppStatus,  // TODO: Implement app status change
        sidebarPanelState,
        setSidebarPanelState
    };

    return (
        <CoreContext.Provider value={context}>
            {children}
        </CoreContext.Provider>
    );
}