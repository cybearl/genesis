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
    const [expandedTransitionDuration, setExpandedTransitionDuration] = useState(
        sidebarPanelState === "collapsed" ? AppConfig.sidebar.panel.collapsedTransitionDuration : AppConfig.sidebar.panel.expandedTransitionDuration
    );

    const [collapsedVisibility, setCollapsedVisibility] = useState(sidebarPanelState === "collapsed" ? "" : "opacity-0");
    const [collapsedTransitionDuration, setCollapsedTransitionDuration] = useState(
        sidebarPanelState === "collapsed" ? AppConfig.sidebar.panel.expandedTransitionDuration : AppConfig.sidebar.panel.collapsedTransitionDuration
    );

    useEffect(() => {
        switch (variant) {
            case "primary":
                if (isDisabled && !isActive) setVariantStyle("border-transparent cursor-default");
                else if (isActive) setVariantStyle("border-white cursor-default bg-secondary-900");
                else setVariantStyle("border-transparent hover:bg-secondary-800 active:border-neutral-600 active:bg-secondary-700");

                break;
        }
    }, [isActive, isDisabled, variant]);

    useEffect(() => {
        switch (sidebarPanelState) {
            case "collapsing":
            case "collapsed":
                setExpandedVisibility("opacity-0");
                setExpandedTransitionDuration(AppConfig.sidebar.panel.collapsedTransitionDuration);
                setCollapsedVisibility("opacity-100");
                setCollapsedTransitionDuration(AppConfig.sidebar.panel.expandedTransitionDuration);

                break;
            case "expanding":
            case "expanded":
                setExpandedVisibility("opacity-100");
                setExpandedTransitionDuration(AppConfig.sidebar.panel.expandedTransitionDuration);
                setCollapsedVisibility("opacity-0");
                setCollapsedTransitionDuration(AppConfig.sidebar.panel.collapsedTransitionDuration);

                break;
        }
    }, [sidebarPanelState]);

    return (
        <button
            className={`
                relative w-full py-3 border-l-2 pr-[4px]
                transition-all ease-in-out duration-100
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