import Image from "next/image";
import { useEffect, useState } from "react";


type LogoProps = {
    size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
};

export default function Logo({
    size = "md"
}: LogoProps) {
    const [sizeStyle, setSizeStyle] = useState("w-12");

    useEffect(() => {
        switch (size) {
            case "sm":
                setSizeStyle("w-8");
                break;
            case "md":
                setSizeStyle("w-12");
                break;
            case "lg":
                setSizeStyle("w-16");
                break;
            case "xl":
                setSizeStyle("w-20");
                break;
            case "2xl":
                setSizeStyle("w-24");
                break;
            case "3xl":
                setSizeStyle("w-32");
                break;
        }
    }, [size]);

    return (
        <div className="gap-2 flex items-center justify-center">
            <div className={`relative aspect-square ${sizeStyle}`}>
                <Image
                    src="/static/images/logo.webp"
                    alt="Logo"
                    fill
                    objectFit="contain"
                    className=""
                    quality={100}
                />
            </div>
        </div>
    );
}