import Image from "next/image";
import { useEffect, useState } from "react";


type LogoProps = {
    size?: "sm" | "md" | "lg" | "xl" | "2xl";
};

export default function Logo({
    size = "md"
}: LogoProps) {
    const [sizeStyle, setSizeStyle] = useState("w-20 h-20");

    useEffect(() => {
        switch (size) {
            case "sm":
                setSizeStyle("w-10 h-10");
                break;
            case "md":
                setSizeStyle("w-20 h-20");
                break;
            case "lg":
                setSizeStyle("w-40 h-40");
                break;
            case "xl":
                setSizeStyle("w-60 h-60");
                break;
            case "2xl":
                setSizeStyle("w-80 h-80");
                break;
        }
    }, [size]);

    return (
        <div className={`relative ${sizeStyle}`}>
            <Image
                src="static/images/logo/colorized.webp"
                alt="Logo"
                fill
                className="object-contain"
            />
        </div>
    );
}