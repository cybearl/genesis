import Image from "next/image";
import { useEffect, useState } from "react";

import Background from "@/components/base/Background";
import CONFIG from "@/configs/app.config";


type LoadingScreenProps = {
    isEnabled?: boolean;
};

export default function LoadingScreen({
    isEnabled = false
}: LoadingScreenProps) {
    const [isFirstAppearance, setIsFirstAppearance] = useState(true);
    const [isHiddenAfterAnimation, setIsHiddenAfterAnimation] = useState(false);

    useEffect(() => {
        if (isEnabled) {
            setIsHiddenAfterAnimation(false);
        }
    }, [isEnabled]);

    return (
        <div
            className={`
                absolute z-20 inset-0 w-full h-full items-end justify-center
                ${isEnabled ? "animate-opacity-in" : "animate-opacity-out"}
                ${isHiddenAfterAnimation ? "hidden" : "flex"}
                ${isFirstAppearance && "!opacity-100"}
            `}
            onAnimationEnd={() => {
                if (!isEnabled) {
                    setIsHiddenAfterAnimation(true);
                }

                setIsFirstAppearance(false);
            }}
            onClick={(e) => e.preventDefault()}
        >
            <Background />

            <div className="absolute top-6 w-full flex justify-between items-center gap-8">
                <hr className="w-full h-[1px] border-transparent bg-gray-300" />
                <div className="w-full text-base max-w-3xl text-center text-gray-300 px-4 max-lg:text-sm max-lg:max-w-xl tracking-wide">
                    {CONFIG.appDescription}
                </div>
                <hr className="w-full h-[1px] border-transparent bg-gray-300" />
            </div>

            <div className="w-full h-full flex flex-col items-center justify-center">
                <div className="relative w-1/4 aspect-square flex items-center max-w-[320px]">
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

                <div className="text-4xl font-extralight text-left">
                    <span className="text-sm pl-4">
                        A project by<br />
                    </span>

                    {CONFIG.appProducer}.
                </div>
            </div>

            <div className="absolute bottom-6 w-full flex justify-between items-center gap-8">
                <hr className="w-full h-[1px] border-transparent bg-gray-300" />
                <div className="w-full text-base max-w-3xl text-center text-gray-300 px-4 max-lg:text-sm max-lg:max-w-xl tracking-wide">
                    {CONFIG.appDisclaimer}
                </div>
                <hr className="w-full h-[1px] border-transparent bg-gray-300" />
            </div>
        </div>
    );
}