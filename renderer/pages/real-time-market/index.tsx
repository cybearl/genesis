import { useContext } from "react";

import { CoreContext } from "@/components/contexts/Core";


export default function RealTimeMarket() {
    const { preferences } = useContext(CoreContext);

    return (
        <div className="w-full min-h-full flex justify-center items-center">
            
        </div>
    );
}