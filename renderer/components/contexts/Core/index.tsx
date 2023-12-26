import { ReactNode, createContext, useState } from "react";


export type IsAppStatus = "loading" | "ready";

type IsCoreContext = {
    appStatus: IsAppStatus;
    setAppStatus: (appStatus: IsAppStatus) => void;
};

export const CoreContext = createContext({} as IsCoreContext);

export default function CoreProvider({ children }: { children: ReactNode; }) {
    const [appStatus, setAppStatus] = useState<IsAppStatus>("loading");


    const context = {
        appStatus,
        setAppStatus
    };

    return (
        <CoreContext.Provider value={context}>
            {children}
        </CoreContext.Provider>
    );
}