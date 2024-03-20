import { ReactNode, useEffect, useState } from "react";

import { SidebarPanelState } from "@/components/contexts/Core";
import AppConfig from "@/configs/app.config";


export type SidebarButtonData = {
    label: string;
    icon: ReactNode;
    textColor?: string;

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

const styles = {
    variant: {
        primary: {
            default: "border-transparent hover:bg-secondary-200 active:border-neutral-600 active:bg-secondary-100",
            disabled: "border-transparent cursor-default",
            active: "border-white cursor-default bg-secondary-900"
        }
    }
};

export default function SidebarButton({
    data,
    sidebarPanelState,

    variant = "primary",

    isDisabled = false,
    isActive = false,

    onClick
}: SidebarButtonProps) {
    const [variantStyle, setVariantStyle] = useState(styles.variant[variant].default);

    const [expandedVisibility, setExpandedVisibility] = useState(sidebarPanelState === "collapsed" ? "opacity-0" : "");
    const [expandedTransitionDuration, setExpandedTransitionDuration] = useState(
        sidebarPanelState === "collapsed" ? AppConfig.sidebar.panel.collapsedTransitionDuration :
            AppConfig.sidebar.panel.expandedTransitionDuration
    );

    const [collapsedVisibility, setCollapsedVisibility] = useState(sidebarPanelState === "collapsed" ? "" : "opacity-0");
    const [collapsedTransitionDuration, setCollapsedTransitionDuration] = useState(
        sidebarPanelState === "collapsed" ? AppConfig.sidebar.panel.expandedTransitionDuration :
            AppConfig.sidebar.panel.collapsedTransitionDuration
    );

    useEffect(() => {
        if (isDisabled && !isActive) setVariantStyle(styles.variant[variant].disabled);
        else if (isActive) setVariantStyle(styles.variant[variant].active);
        else setVariantStyle(styles.variant[variant].default);
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
                ${data.textColor}
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
                    {data.label}
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