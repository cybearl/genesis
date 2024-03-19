import Image from "next/image";
import { useEffect, useState } from "react";

import Background from "@/components/base/Background";
import AppConfig from "@/configs/app.config";


type LoadingScreenProps = {
    isEnabled?: boolean;
};

export default function LoadingScreen({
    isEnabled = false
}: LoadingScreenProps) {
    const [isFirstAppearance, setIsFirstAppearance] = useState(true);
    const [isHidden, setIsHidden] = useState(false);

    useEffect(() => {
        if (isFirstAppearance) setIsFirstAppearance(false);
    }, [isFirstAppearance]);

    useEffect(() => {
        if (isEnabled) setIsHidden(false);
        else setTimeout(() => setIsHidden(true), 500);
    }, [isEnabled]);

    return (
        <div
            className="absolute z-50 inset-0 w-full h-full items-end justify-center bg-secondary-700 pointer-events-none"
            style={{
                animation: `${isEnabled ? "opacity-in" : "opacity-out"} 0.5s ease-in-out`,
                display: isHidden ? "none" : "flex",
                opacity: isFirstAppearance ? 1 : "unset"
            }}
            onClick={(e) => e.preventDefault()}
        >
            <Background
                layerOneOpacity={AppConfig.loadingScreen.layerOneOpacity}
                layerOneBlur={AppConfig.loadingScreen.layerOneBlur}
                layerTwoOpacity={AppConfig.loadingScreen.layerTwoOpacity}
                layerTwoBlur={AppConfig.loadingScreen.layerTwoBlur}
            />

            <div className="absolute top-6 w-full flex justify-between items-center gap-8">
                <hr className="w-full h-[1px] border-transparent bg-white grow" />

                <div className="w-full text-base max-w-3xl text-center px-2 max-lg:text-sm tracking-wide">
                    {AppConfig.appDescription}
                </div>

                <hr className="w-full h-[1px] border-transparent bg-white grow" />
            </div>

            <div className="w-full h-full flex flex-col items-center justify-center">
                <div className="relative w-1/4 aspect-square flex items-center max-w-[320px]">
                    <Image
                        src="/static/images/logo/grayscale.webp"
                        alt="Loading screen logo"
                        fill
                        className="opacity-50"
                    />

                    <Image
                        src="/static/images/logo/colorized.webp"
                        alt="Loading screen logo"
                        fill
                        className="animate-opacity-pulse p-1"
                    />
                </div>

                <div className="text-4xl font-extralight text-left">
                    <span className="text-sm pl-4">
                        A project by<br />
                    </span>

                    {AppConfig.appProducer}.
                    <hr className="w-full h-[1px] border-transparent bg-white mt-1" />
                </div>
            </div>

            <div className="absolute bottom-6 w-full flex justify-between items-center gap-8">
                <hr className="h-[1px] border-transparent bg-white grow" />

                <div className="w-full text-base max-w-3xl text-center px-2 max-lg:text-sm tracking-wide">
                    {AppConfig.appDisclaimer}
                </div>

                <hr className="h-[1px] border-transparent bg-white grow" />
            </div>
        </div>
    );
}