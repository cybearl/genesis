import { ReactNode, useState } from "react";

import Tab from "@/components/base/Tab";


type TabsProps = {
    labels: string[];
    tabs: ReactNode[];

    spreadAcross?: boolean;
};

export default function Tabs({
    labels,
    tabs,

    spreadAcross = false
}: TabsProps) {
    const [currentTab, setCurrentTab] = useState(0);

    return (
        <div className="flex flex-col w-full">
            <div className={`
                w-full flex items-center border-b border-neutral-800
                bg-black bg-opacity-[0.4] backdrop-blur-lg text-neutral-500
                ${spreadAcross ? "justify-between" : "justify-start"}
            `}>
                {labels.map((label, index) => (
                    <div key={index} className={`border-neutral-800 w-full ${index !== labels.length - 1 && "border-r"}`}>
                        <Tab
                            label={label}
                            isActive={index === currentTab}
                            onClick={() => setCurrentTab(index)}
                            isCloseable={true}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}