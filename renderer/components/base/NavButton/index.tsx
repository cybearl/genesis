import { ReactNode, useEffect, useState } from "react";

import { IsNavPanelState } from "@/components/contexts/Core";


type NavButtonProps = {
    label: string;
    icon: ReactNode;
    navPanelState: IsNavPanelState;

    variant?: "primary" | "secondary" | "tertiary";
    size?: "sm" | "md" | "lg";

    onClick?: () => void;
    isDisabled?: boolean;
};

export default function NavButton({
    label,
    icon,
    navPanelState,

    variant = "primary",
    size = "md",

    onClick,
    isDisabled = false
}: NavButtonProps) {
    const [variantStyle, setVariantStyle] = useState("");
    const [sizeStyle, setSizeStyle] = useState("");

    useEffect(() => {
        switch (variant) {
            case "primary":
                if (isDisabled) setVariantStyle("text-neutral-800 cursor-default");
                else setVariantStyle("text-primary-400 hover:text-primary-500 active:text-primary-600");
                break;
            case "secondary":
                setVariantStyle("");
                break;
            case "tertiary":
                setVariantStyle("");
                break;
        }
    }, [isDisabled, variant]);

    useEffect(() => {
        switch (size) {
            case "sm":
                setSizeStyle("child:!text-2xl");
                break;
            case "md":
                setSizeStyle("child:!text-3xl");
                break;
            case "lg":
                setSizeStyle("child:!text-4xl");
                break;
        }
    }, [size]);

    return (
        <button
            className={`
                transition-all duration-150 ease-in-out w-full pb-2 pt-1 flex justify-center items-center
                ${variantStyle}
                ${sizeStyle}
            `}
            onClick={onClick}
        >
            <div className="flex items-center gap-3">
                <span className={`
                    leading-none
                    ${navPanelState === "expanded" ? "child:!text-3xl" : "child:!text-4xl"}
                `}>
                    {icon}
                </span>

                <p className={`
                    text-sm pt-1.5 tracking-wider
                    ${navPanelState === "expanded" ? "block" : "hidden"}
                `}>
                    {label}
                </p>
            </div>
        </button>
    );
}