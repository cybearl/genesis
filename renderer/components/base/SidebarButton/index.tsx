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

    const [iconWithLabelVisibility, setIconWithLabelVisibility] = useState(
        sidebarPanelState === "collapsed" ? "opacity-0" : ""
    );

    const [iconWithLabelTransitionDuration, setIconWithLabelTransitionDuration] = useState(
        sidebarPanelState === "collapsed" ? 0.5 : 2
    );

    const [iconOnlyVisibility, setIconOnlyVisibility] = useState(
        sidebarPanelState === "collapsed" ? "" : "opacity-0"
    );

    const [iconOnlyTransitionDuration, setIconOnlyTransitionDuration] = useState(
        sidebarPanelState === "collapsed" ? 2 : 0.5
    );

    useEffect(() => {
        switch (variant) {
            case "primary":
                if (isDisabled) setVariantStyle("border-transparent text-secondary-500 cursor-default");
                else if (!isDisabled && isActive) setVariantStyle("border-white cursor-default bg-secondary-950");
                else setVariantStyle("border-transparent hover:bg-secondary-900 active:border-secondary-600");

                break;
        }
    }, [isActive, isDisabled, variant]);

    useEffect(() => {
        switch (sidebarPanelState) {
            case "collapsing":
            case "collapsed":
                setIconWithLabelVisibility("opacity-0");
                setIconWithLabelTransitionDuration(0.5);
                setIconOnlyVisibility("opacity-100");
                setIconOnlyTransitionDuration(2);

                break;
            case "expanding":
            case "expanded":
                setIconWithLabelVisibility("opacity-100");
                setIconWithLabelTransitionDuration(2);
                setIconOnlyVisibility("opacity-0");
                setIconOnlyTransitionDuration(0.5);

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
                    flex justify-center items-center gap-3
                    transition-opacity ease-in-out
                    ${iconWithLabelVisibility}
                `}
                style={{
                    transitionDuration: `${Math.round(AppConfig.sidebar.panel.transitionDuration * iconWithLabelTransitionDuration)}ms`
                }}
            >
                <span className="leading-none child:text-3xl">
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
                    ${iconOnlyVisibility}
                `}
                style={{
                    transitionDuration: `${Math.round(AppConfig.sidebar.panel.transitionDuration * iconOnlyTransitionDuration)}ms`
                }}
            >
                <span className="leading-none child:text-3xl">
                    {data.icon}
                </span>
            </div>
        </button>
    );
}