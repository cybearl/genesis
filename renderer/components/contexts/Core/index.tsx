import { ReactNode, createContext, useEffect, useState } from "react";

import useInterval from "@/hooks/useInterval";
import { closeSplashScreen, getAppLoadingStatus, openMainWindow, updateAppLoadingStatus } from "@/lib/crud/appLoadingStatus";
import { getEnvironment } from "@/lib/crud/environment";
import { getLocalStorage } from "@/lib/crud/localStorage";
import { getPreferences } from "@/lib/crud/preferences";
import { AppLoadingStatus, Environment } from "@sharedTypes/api";
import { LocalStorage, Preferences } from "@sharedTypes/storage";


export type SidebarPanelState = "collapsing" | "collapsed" | "expanding" | "expanded";

type CoreContext = {
    appLoadingStatus: AppLoadingStatus | undefined;
    environment: Environment | undefined;
    localStorage: LocalStorage | undefined;
    preferences: Preferences | undefined;

    sidebarPanelState: SidebarPanelState;
    setSidebarPanelState: (sidebarPanelState: SidebarPanelState) => void;
    currentPage: number;
    setCurrentPage: (currentPage: number) => void;
};

export const CoreContext = createContext({} as CoreContext);

export default function CoreProvider({ children }: { children: ReactNode; }) {
    const [appLoadingStatus, setAppLoadingStatus] = useState<AppLoadingStatus>();
    const [environment, setEnvironment] = useState<Environment>();
    const [localStorage, setLocalStorage] = useState<LocalStorage>();
    const [preferences, setPreferences] = useState<Preferences>();

    const [sidebarPanelState, setSidebarPanelState] = useState<SidebarPanelState>("expanded");
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        const getInitialData = async () => {
            const status = await getAppLoadingStatus();
            const env = await getEnvironment();
            const storage = await getLocalStorage();
            const prefs = await getPreferences();

            if (status) setAppLoadingStatus(status);
            if (env) setEnvironment(env);
            if (storage) setLocalStorage(storage);
            if (prefs) setPreferences(prefs);

            // Default local storage values
            setSidebarPanelState(storage?.lastSidebarState || "expanded");
            setCurrentPage(storage?.lastOpenedPage || 0);
        };

        getInitialData();
    }, []);

    useInterval(async () => {
        // TODO: Replace by real data
        const result = await updateAppLoadingStatus(10);
        if (environment && result) setAppLoadingStatus(result);
    }, 200);

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
        appLoadingStatus,
        environment,
        localStorage,
        preferences,

        sidebarPanelState,
        setSidebarPanelState,
        currentPage,
        setCurrentPage
    };

    return (
        <CoreContext.Provider value={context}>
            {children}
        </CoreContext.Provider>
    );
}