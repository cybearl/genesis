import { ReactNode, createContext, useEffect, useState } from "react";

import { SHR__Info } from "@sharedTypes/shared";


export type AppStatus = "loading" | "ready";
export type SidebarPanelState = "collapsing" | "collapsed" | "expanding" | "expanded";

type CoreContext = {
    info: SHR__Info | null;
    appStatus: AppStatus;
    setAppStatus: (appStatus: AppStatus) => void;
    sidebarPanelState: SidebarPanelState;
    setSidebarPanelState: (sidebarPanelState: SidebarPanelState) => void;
};

export const CoreContext = createContext({} as CoreContext);

export default function CoreProvider({ children }: { children: ReactNode; }) {
    const [info, setInfo] = useState<SHR__Info | null>(null);
    const [appStatus, setAppStatus] = useState<AppStatus>("loading");
    const [sidebarPanelState, setSidebarPanelState] = useState<SidebarPanelState>("expanded");

    useEffect(() => {
        const getAppInfo = async () => {
            const res = await window.ipcFetch("/api/info");
            if (res.data) setInfo(res.data as SHR__Info);
        };

        getAppInfo();
    }, []);

    const context = {
        info,
        appStatus,
        setAppStatus,
        sidebarPanelState,
        setSidebarPanelState
    };

    return (
        <CoreContext.Provider value={context}>
            {children}
        </CoreContext.Provider>
    );
}