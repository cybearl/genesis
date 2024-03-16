import { ReactNode } from "react";

import AppConfig from "@/configs/app.config";


type StatusBarProps = {
    leftSideContent?: ReactNode[];
    rightSideContent?: ReactNode[];
};

export default function StatusBar({
    leftSideContent = [],
    rightSideContent = []
}: StatusBarProps) {
    return (
        <div className={`
            w-full h-8 flex items-center px-4 backdrop-blur-lg text-secondary-300
        `}>
            <div
                className="-z-10 absolute inset-0 bg-black"
                style={{
                    opacity: AppConfig.statusBar.opacity,
                    backdropFilter: `blur(${AppConfig.statusBar.blur}px)`
                }}
            />

            <div className="flex-grow flex items-center justify-start gap-4">
                {leftSideContent.map((content, index) => (
                    <p key={index} className="font-semibold text-sm">
                        {content}
                    </p>
                ))}
            </div>

            <div className="flex-grow flex items-center justify-end gap-4">
                {rightSideContent.map((content, index) => (
                    <p key={index} className="font-bold tracking-wider text-sm">
                        {content}
                    </p>
                ))}
            </div>
        </div>
    );
}