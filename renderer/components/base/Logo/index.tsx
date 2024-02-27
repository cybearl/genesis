import Image from "next/image";
import { useEffect, useState } from "react";


type LogoProps = {
    size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
};

export default function Logo({
    size = "md"
}: LogoProps) {
    const [sizeStyle, setSizeStyle] = useState("w-20 h-20");

    useEffect(() => {
        switch (size) {
            case "sm":
                setSizeStyle("w-12 h-12");
                break;
            case "md":
                setSizeStyle("w-16 h-16");
                break;
            case "lg":
                setSizeStyle("w-20 h-20");
                break;
            case "xl":
                setSizeStyle("w-24 h-24");
                break;
            case "2xl":
                setSizeStyle("w-32 h-32");
                break;
            case "3xl":
                setSizeStyle("w-40 h-40");
                break;
        }
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