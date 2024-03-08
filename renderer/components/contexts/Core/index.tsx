import { ReactNode, createContext, useEffect, useState } from "react";

import { SharedT__Info } from "@sharedTypes/shared";


export type AppStatus = "loading" | "ready";
export type NavPanelState = "collapsing" | "collapsed" | "expanding" | "expanded";

type CoreContext = {
    info: SharedT__Info | null;
    appStatus: AppStatus;
    setAppStatus: (appStatus: AppStatus) => void;
    navPanelState: NavPanelState;
    setNavPanelState: (navPanelState: NavPanelState) => void;
};

export const CoreContext = createContext({} as CoreContext);

export default function CoreProvider({ children }: { children: ReactNode; }) {
    const [info, setInfo] = useState<SharedT__Info | null>(null);
    const [appStatus, setAppStatus] = useState<AppStatus>("ready");
    const [navPanelState, setNavPanelState] = useState<NavPanelState>("expanded");

    useEffect(() => {
        const getAppInfo = async () => {
            const res = await window.ipcFetch("/api/info");
            if (res.data) setInfo(res.data as SharedT__Info);
        };

        getAppInfo();
    }, []);

    const context = {
        info,
        appStatus,
        setAppStatus,
        navPanelState,
        setNavPanelState
    };

    return (
        <CoreContext.Provider value={context}>
            {children}
        </CoreContext.Provider>
    );
}