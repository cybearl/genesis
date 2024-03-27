import { useContext } from "react";

import { CoreContext } from "@/components/contexts/Core";


export default function RealTimeMarket() {
    const { userPreferences } = useContext(CoreContext);

    return (
        <div className="w-full min-h-full flex justify-center items-center">
            {userPreferences?.interface.sidebar.panel.expandedSize}
        </div>
    );
}