import { ReactNode, createContext, useEffect, useState } from "react";

import NsShared from "@sharedTypes/shared";


export type IsAppStatus = "loading" | "ready";
export type IsNavPanelState = "collapsing" | "collapsed" | "expanding" | "expanded";

type IsCoreContext = {
    appInfo: NsShared.AppInfo | null;
    appStatus: IsAppStatus;
    setAppStatus: (appStatus: IsAppStatus) => void;
    navPanelState: IsNavPanelState;
    setNavPanelState: (navPanelState: IsNavPanelState) => void;
};

export const CoreContext = createContext({} as IsCoreContext);

export default function CoreProvider({ children }: { children: ReactNode; }) {
    const [appInfo, setAppInfo] = useState<NsShared.AppInfo | null>(null);
    const [appStatus, setAppStatus] = useState<IsAppStatus>("ready");
    const [navPanelState, setNavPanelState] = useState<IsNavPanelState>("expanded");

    useEffect(() => {
        const getAppInfo = async () => {
            const appInfo = await window.api.getAppInfo();
            setAppInfo(appInfo);
        };

        getAppInfo();
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