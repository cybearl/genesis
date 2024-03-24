import { ReactNode, createContext, useEffect, useState } from "react";

import useInterval from "@/hooks/useInterval";
import { closeSplashScreen, updateAppLoadingStatus } from "@/lib/crud/appLoadingStatus";
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
    const [appLoadingStatus, setAppLoadingStatus] = useState<AppLoadingStatus>();
    const [sidebarPanelState, setSidebarPanelState] = useState<SidebarPanelState>("expanded");

    useInterval(async () => {
        const result = await updateAppLoadingStatus(10);
        if (result) { setAppLoadingStatus(result); }
    }, 300);

    useEffect(() => {
        // const openMainWindow = async () => {
        //     if (appLoadingStatus?.loaded) await closeSplashScreen();
        // };

        // openMainWindow();
    }, [appLoadingStatus?.loaded]);

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