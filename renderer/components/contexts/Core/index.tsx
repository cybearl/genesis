import { ReactNode, createContext, useEffect, useState } from "react";

import useInterval from "@/hooks/useInterval";
import { closeSplashScreen, getAppLoadingStatus, openMainWindow, updateAppLoadingStatus } from "@/lib/crud/appLoadingStatus";
import { getEnvironment } from "@/lib/crud/environment";
import { AppLoadingStatus, Environment } from "@sharedTypes/api";


export type SidebarPanelState = "collapsing" | "collapsed" | "expanding" | "expanded";

type CoreContext = {
    appLoadingStatus: AppLoadingStatus | undefined;
    environment: Environment | undefined;
    sidebarPanelState: SidebarPanelState;
    setSidebarPanelState: (sidebarPanelState: SidebarPanelState) => void;
};

export const CoreContext = createContext({} as CoreContext);

export default function CoreProvider({ children }: { children: ReactNode; }) {
    const [appLoadingStatus, setAppLoadingStatus] = useState<AppLoadingStatus>();
    const [environment, setEnvironment] = useState<Environment>();
    const [sidebarPanelState, setSidebarPanelState] = useState<SidebarPanelState>("expanded");

    useEffect(() => {
        const getInitialData = async () => {
            const env = await getEnvironment();
            const status = await getAppLoadingStatus();

            if (env) setEnvironment(env);
            if (status) setAppLoadingStatus(status);
        };

        getInitialData();
    }, []);

    useInterval(async () => {
        // TODO: Replace by real data
        const result = await updateAppLoadingStatus(10);
        if (environment && result) setAppLoadingStatus(result);
    }, 300);

    useEffect(() => {
        const closeSplash = async () => {
            if (appLoadingStatus?.currentWindow === "splash-screen" && appLoadingStatus?.loaded) {
                await closeSplashScreen();
            }
        };

        const openMain = async () => {
            if (appLoadingStatus?.currentWindow === "none" && appLoadingStatus?.loaded) {
                await openMainWindow();
            }
        };

        closeSplash();
        openMain();
    }, [appLoadingStatus?.currentWindow, appLoadingStatus?.loaded, appLoadingStatus?.progress]);

    const context = {
        environment,
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