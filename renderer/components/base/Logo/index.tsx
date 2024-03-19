import Image from "next/image";
import { useEffect, useState } from "react";


type LogoProps = {
    size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
};

const styles = {
    size: {
        "sm": "w-12 h-12",
        "md": "w-16 h-16",
        "lg": "w-20 h-20",
        "xl": "w-24 h-24",
        "2xl": "w-32 h-32",
        "3xl": "w-40 h-40"
    }
};

export default function Logo({
    size = "md"
}: LogoProps) {
    const [sizeStyle, setSizeStyle] = useState(styles.size[size]);

    useEffect(() => {
        setSizeStyle(styles.size[size]);
    }, [size]);

    return (
        <div className={`relative aspect-square ${sizeStyle}`}>
            <Image
                src="/static/images/logo/grayscale.webp"
                alt="Loading screen logo"
                fill
                className="opacity-50 p-[2px]"
            />

            <Image
                src="/static/images/logo/colorized.webp"
                alt="Loading screen logo"
                fill
                className="animate-opacity-pulse"
            />
        </div>
    );
}