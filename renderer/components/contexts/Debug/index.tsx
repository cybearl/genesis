import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from "react";

import { CoreContext } from "@/components/contexts/Core";


type IsDebugContext = {
    debugValues: { [key: string]: unknown; };
    setDebugValues: (debugValues: { [key: string]: unknown; }) => void;
};

export const DebugContext = createContext({} as IsDebugContext);

export default function DebugProvider({ children }: { children: ReactNode; }) {
    const { navPanelState } = useContext(CoreContext);

    const [currDebugValues, setCurrDebugValues] = useState<{ [key: string]: unknown; }>({
        "NODE_ENV": process.env.NODE_ENV,
        "navPanelState": navPanelState
    });

    const setDebugValues = useCallback((values: { [key: string]: unknown; }) => {
        setCurrDebugValues({
            ...currDebugValues,
            ...values
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setDebugValues({
            "navPanelState": navPanelState
        });
    }, [navPanelState, setDebugValues]);

    const context = {
        debugValues: currDebugValues,
        setDebugValues
    };

    return (
        <DebugContext.Provider value={context}>
            {children}
        </DebugContext.Provider>
    );
}