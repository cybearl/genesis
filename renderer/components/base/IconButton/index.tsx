import { ReactNode, useEffect, useState } from "react";


type IconButtonProps = {
    icon: ReactNode;

    variant?: "primary" | "secondary" | "tertiary";
    size?: "sm" | "md" | "lg";

    onClick?: () => void;
    isDisabled?: boolean;
};

export default function IconButton({
    icon,

    variant = "primary",
    size = "md",

    onClick,
    isDisabled = false
}: IconButtonProps) {
    const [variantStyle, setVariantStyle] = useState("");
    const [sizeStyle, setSizeStyle] = useState("");


    useEffect(() => {
        switch (variant) {
            case "primary":
                if (isDisabled) setVariantStyle("text-neutral-800 cursor-not-allowed");
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
                setSizeStyle("child:!text-4xl");
                break;
            case "lg":
                setSizeStyle("child:!text-5xl");
                break;
        }
    }, [size]);

    return (
        <button
            className={`
                transition-all duration-150 ease-in-out
                ${variantStyle}
                ${sizeStyle}
            `}
            onClick={onClick}
        >
            {icon}
        </button>
    );
}