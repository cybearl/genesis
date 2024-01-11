import { ReactNode, createContext, useEffect, useState } from "react";

import NsShared from "@sharedTypes/shared";


export type IsAppStatus = "loading" | "ready";
export type IsNavPanelState = "collapsing" | "collapsed" | "expanding" | "expanded";

type IsCoreContext = {
    appInfo: NsShared.IsAppInfo | null;
    appStatus: IsAppStatus;
    setAppStatus: (appStatus: IsAppStatus) => void;
    navPanelState: IsNavPanelState;
    setNavPanelState: (navPanelState: IsNavPanelState) => void;
};

export const CoreContext = createContext({} as IsCoreContext);

export default function CoreProvider({ children }: { children: ReactNode; }) {
    const [appInfo, setAppInfo] = useState<NsShared.IsAppInfo | null>(null);
    const [appStatus, setAppStatus] = useState<IsAppStatus>("ready");
    const [navPanelState, setNavPanelState] = useState<IsNavPanelState>("expanded");

    useEffect(() => {
        const test = async () => {
            const response = await window.fetcher("");
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