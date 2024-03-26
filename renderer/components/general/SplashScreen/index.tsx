import Image from "next/image";
import { useContext } from "react";

import ProgressBar from "@/components/base/ProgressBar";
import { CoreContext } from "@/components/contexts/Core";


type SplashScreenProps = {
    isEnabled?: boolean;
};

export default function SplashScreen({
    isEnabled = false
}: SplashScreenProps) {
    const { appLoadingStatus } = useContext(CoreContext);

    if (!isEnabled) return null;

    return (
        <div
            className="absolute z-50 inset-0 bg-primary-900 pointer-events-none flex items-center justify-center flex-col"
            onClick={(e) => e.preventDefault()}
        >
            <div className="absolute w-1/2 aspect-square z-0 mr-2">
                <Image
                    src="/static/images/logo/grayscale.webp"
                    alt="Loading screen logo"
                    fill
                    className="opacity-30 object-cover overflow-visible"
                />

                <Image
                    src="/static/images/logo/colorized.webp"
                    alt="Loading screen logo"
                    fill
                    className="animate-opacity-pulse p-1 object-cover"
                />
            </div>

            <div className="relative w-full h-full flex z-10 justify-center items-center">
                <div className="w-full backdrop-blur-sm h-full" />
                <div className="w-full h-full" />

                <div className="absolute inset-0 flex justify-between p-4">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-white text-5xl font-light">
                            GENESIS
                            <span className="text-sm text-yellow-500 font-normal">
                                &nbsp;[DEVELOPER MODE]
                            </span>
                        </h1>

                        <div className="flex justify-between items-center gap-4">
                            <p className="pl-1 text-sm text-nowrap">
                                BETA v1.5.4
                            </p>

                            <hr className="h-[1px] w-full bg-gray-400 border-none" />
                        </div>

                        <p className="text-xs text-gray-500 pl-1">
                            Copyright © 2023 Cybearl
                        </p>
                    </div>
                </div>

                <div className="absolute w-full bottom-8 flex items-center justify-center">
                    <p className="text-gray-200 text-sm">
                        {appLoadingStatus?.stream ? appLoadingStatus.stream : "Loading..."}
                    </p>
                </div>

                <div className="absolute w-full bottom-4 right-4 text-end">
                    <p className="text-xs text-gray-200">
                        {appLoadingStatus?.progress ? `${appLoadingStatus.progress}%` : "0%"}
                    </p>
                </div>
            </div>

            <ProgressBar
                progress={64}
                size="xs"
            />
        </div>
    );
}