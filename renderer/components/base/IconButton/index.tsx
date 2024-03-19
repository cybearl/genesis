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

const styles = {
    variant: {
        primary: {
            "enabled": "text-white hover:bg-secondary-200 active:bg-secondary-900",
            "disabled": "text-white cursor-default bg-secondary-900"
        },
        secondary: {
            "enabled": "",
            "disabled": ""
        },
        tertiary: {
            "enabled": "",
            "disabled": ""
        }
    },
    size: {
        "sm": "text-2xl",
        "md": "text-3xl",
        "lg": "text-4xl"
    }
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
    const [variantStyle, setVariantStyle] = useState(isDisabled ? styles.variant[variant].disabled : styles.variant[variant].enabled);
    const [sizeStyle, setSizeStyle] = useState(styles.size[size]);

    useEffect(() => {
        if (isDisabled) setVariantStyle(styles.variant[variant].disabled);
        else setVariantStyle(styles.variant[variant].enabled);
    }, [isDisabled, variant]);

    useEffect(() => {
        setSizeStyle(styles.size[size]);
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