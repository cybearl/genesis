import { ReactNode, createContext, useEffect, useState } from "react";

import NsShared from "@sharedTypes/shared";


export type AppStatus = "loading" | "ready";
export type NavPanelState = "collapsing" | "collapsed" | "expanding" | "expanded";

type CoreContext = {
    appInfo: NsShared.AppInfo | null;
    appStatus: AppStatus;
    setAppStatus: (appStatus: AppStatus) => void;
    navPanelState: NavPanelState;
    setNavPanelState: (navPanelState: NavPanelState) => void;
};

export const CoreContext = createContext({} as CoreContext);

export default function CoreProvider({ children }: { children: ReactNode; }) {
    const [appInfo, setAppInfo] = useState<NsShared.AppInfo | null>(null);
    const [appStatus, setAppStatus] = useState<AppStatus>("ready");
    const [navPanelState, setNavPanelState] = useState<NavPanelState>("expanded");

    useEffect(() => {
        const test = async () => {
            const response = await window.ipcFetcher("");
            console.log(response);
        };

        test();
    }, []);

    const context = {
        appInfo,
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