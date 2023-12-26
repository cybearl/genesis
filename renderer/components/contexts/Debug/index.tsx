import { ReactNode, createContext, useState } from "react";


type IsDebugContext = {
    debugValues: { [key: string]: unknown; };
    setDebugValues: (debugValues: { [key: string]: unknown; }) => void;
};

export const DebugContext = createContext({} as IsDebugContext);

export default function DebugProvider({ children }: { children: ReactNode; }) {
    const [currDebugValues, setCurrDebugValues] = useState<{ [key: string]: unknown; }>({
        "NODE_ENV": process.env.NODE_ENV
    });

    const setDebugValues = (values: { [key: string]: unknown; }) => {
        setCurrDebugValues({
            ...currDebugValues,
            ...values
        });
    };

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