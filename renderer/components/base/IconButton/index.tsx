import { ReactNode, useEffect, useState } from "react";


type IconButtonProps = {
    icon: ReactNode;

    title?: string;
    variant?: "primary" | "secondary" | "tertiary";
    size?: "sm" | "md" | "lg";
    useParentSize?: boolean;

    isDisabled?: boolean;

    onClick?: () => void;
};

export default function IconButton({
    icon,

    title,
    variant = "primary",
    size = "md",
    useParentSize = false,

    isDisabled = false,

    onClick
}: IconButtonProps) {
    const [variantStyle, setVariantStyle] = useState("");
    const [sizeStyle, setSizeStyle] = useState("");

    useEffect(() => {
        switch (variant) {
            case "primary":
                if (isDisabled) setVariantStyle("text-white cursor-default bg-secondary-50");
                else setVariantStyle("text-white hover:bg-secondary-100 active:bg-secondary-50 bg-secondary-200");

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
                setSizeStyle("text-2xl");
                break;
            case "md":
                setSizeStyle("text-3xl");
                break;
            case "lg":
                setSizeStyle("text-4xl");
                break;
        }
    }, [size]);

    return (
        <button
            className={`
                transition-all duration-150 ease-in-out flex justify-center items-center
                ${variantStyle}
                ${sizeStyle}
                ${useParentSize ? "w-full h-full" : "p-1"}
            `}
            title={title}
            disabled={isDisabled}
            onClick={onClick}
        >
            {icon}
        </button>
    );
}