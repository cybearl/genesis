import Image from "next/image";
import { useEffect, useState } from "react";

import Background from "@/components/base/Background";
import CONFIG from "@/configs/app.config";


type LoadingScreenProps = {
    hidden?: boolean;
};

export default function LoadingScreen({
    hidden = false
}: LoadingScreenProps) {
    const [opacity, setOpacity] = useState(1);
    const [startAnimation, setStartAnimation] = useState({
        colorized: false,
        grayscale: false
    });

    useEffect(() => {
        const animationInterval = setInterval(() => {
            if (hidden && opacity > 0) {
                setOpacity(opacity - 0.01);
            } else if (!hidden && opacity < 1) {
                setOpacity(opacity + 0.01);
            }
        }, 5);

        return () => clearInterval(animationInterval);
    }, [hidden, opacity]);

    useEffect(() => {
        const animationDelay = setTimeout(() => {
            setStartAnimation({
                colorized: true,
                grayscale: false
            });
        }, 1000);

        const animationDelay2 = setTimeout(() => {
            setStartAnimation({
                colorized: true,
                grayscale: true
            });
        }, 1500);

        return () => {
            clearTimeout(animationDelay);
            clearTimeout(animationDelay2);
        };
    }, []);

    return (
        <div
            className="absolute z-20 inset-0 w-full h-full items-end justify-center"
            style={{
                opacity: opacity,
                transition: "opacity 5ms ease-in-out",
                display: opacity <= 0 ? "none" : "flex"
            }}
            onClick={(e) => e.preventDefault()}
        >
            <Background />

            <div className="absolute top-6 w-full flex justify-between items-center gap-8">
                <hr className="w-full h-[1px] border-transparent bg-gray-300" />
                <div className="w-full text-base max-w-3xl text-center font-normal text-gray-300 px-4 max-lg:text-sm max-lg:max-w-xl">
                    {CONFIG.appDescription}
                </div>
                <hr className="w-full h-[1px] border-transparent bg-gray-300" />
            </div>

            <div className="w-full h-full flex flex-col items-center justify-center">
                <div className="relative w-1/4 aspect-square flex items-center max-w-[320px]">
                    <Image
                        src="/static/images/logo/cybearl_grayscale.webp"
                        alt="Loading screen logo"
                        fill
                        className="opacity-30"
                    />

                    <Image
                        src="/static/images/logo/cybearl_colorized.webp"
                        alt="Loading screen logo"
                        fill
                        className={`${startAnimation.colorized && "animate-opacity-pulse"} pb-[4px]`}
                    />
                </div>

                <div className="text-4xl font-extralight text-left">
                    <span className="text-sm pl-4">
                        A project by<br />
                    </span>

                    {CONFIG.appProducer}.
                </div>
            </div>

            <div className="absolute bottom-6 w-full flex justify-between items-center gap-8">
                <hr className="w-full h-[1px] border-transparent bg-gray-300" />
                <div className="w-full text-base max-w-3xl text-center font-normal text-gray-300 px-4 max-lg:text-sm max-lg:max-w-xl">
                    {CONFIG.appDisclaimer}
                </div>
                <hr className="w-full h-[1px] border-transparent bg-gray-300" />
            </div>
        </div>
    );
}