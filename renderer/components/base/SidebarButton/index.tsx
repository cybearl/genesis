import { ReactNode, useEffect, useState } from "react";

import { SidebarPanelState } from "@/components/contexts/Core";
import AppConfig from "@/configs/app.config";


export type SidebarButtonData = {
    label: string;
    icon: ReactNode;
    isDisabled?: boolean;
};

type SidebarButtonProps = {
    data: SidebarButtonData;
    sidebarPanelState: SidebarPanelState;

    variant?: "primary";

    isDisabled?: boolean;
    isActive?: boolean;

    onClick?: () => void;
};

export default function SidebarButton({
    data,
    sidebarPanelState,

    variant = "primary",

    isDisabled = false,
    isActive = false,

    onClick
}: SidebarButtonProps) {
    const [variantStyle, setVariantStyle] = useState("");

    const [expandedVisibility, setExpandedVisibility] = useState(sidebarPanelState === "collapsed" ? "opacity-0" : "");
    const [expandedTransitionDuration, setExpandedTransitionDuration] = useState(sidebarPanelState === "collapsed" ? 0.5 : 2);
    const [collapsedVisibility, setCollapsedVisibility] = useState(sidebarPanelState === "collapsed" ? "" : "opacity-0");
    const [collapsedTransitionDuration, setCollapsedTransitionDuration] = useState(sidebarPanelState === "collapsed" ? 2 : 0.5);

    useEffect(() => {
        switch (variant) {
            case "primary":
                if (isDisabled && !isActive) setVariantStyle("border-transparent text-neutral-500 cursor-default");
                else if (isActive) setVariantStyle("border-white cursor-default bg-secondary-950");
                else setVariantStyle("border-transparent hover:bg-secondary-900 active:border-secondary-600");

                break;
        }
    }, [isActive, isDisabled, variant]);

    useEffect(() => {
        switch (sidebarPanelState) {
            case "collapsing":
            case "collapsed":
                setExpandedVisibility("opacity-0");
                setExpandedTransitionDuration(0.5);
                setCollapsedVisibility("opacity-100");
                setCollapsedTransitionDuration(2);

                break;
            case "expanding":
            case "expanded":
                setExpandedVisibility("opacity-100");
                setExpandedTransitionDuration(2);
                setCollapsedVisibility("opacity-0");
                setCollapsedTransitionDuration(0.5);

                break;
        }
    }, [sidebarPanelState]);

    return (
        <button
            className={`
                relative w-full py-3 border-l-2 pr-[4px]
                transition-all ease-in-out duration-150
                ${variantStyle}
            `}
            title={(!isActive && sidebarPanelState === "collapsed") ? data.label : ""}
            disabled={isDisabled}
            onClick={onClick}
        >
            <div
                className={`
                    flex justify-star pl-[20px] items-center gap-3
                    transition-opacity ease-in-out
                    ${expandedVisibility}
                `}
                style={{
                    transitionDuration: `${Math.round(AppConfig.sidebar.panel.transitionDuration * expandedTransitionDuration)}ms`
                }}
            >
                <span className="leading-none text-3xl">
                    {data.icon}
                </span>

                <p className="text-sm tracking-wider font-semibold text-nowrap">
                    {data.label.padEnd(AppConfig.sidebar.panel.minLabelLength, "\xa0")}
                </p>
            </div>

            <div
                className={`
                    absolute top-0 left-0 w-full h-full justify-center flex items-center pr-[2px]
                    transition-opacity ease-in-out
                    ${collapsedVisibility}
                `}
                style={{
                    transitionDuration: `${Math.round(AppConfig.sidebar.panel.transitionDuration * collapsedTransitionDuration)}ms`
                }}
            >
                <span className="leading-none text-3xl">
                    {data.icon}
                </span>
            </div>
        </button>
    );
}