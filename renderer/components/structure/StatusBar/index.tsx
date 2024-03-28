import { ReactNode } from "react";

import StaticConfig from "@/lib/config/static.config";


type StatusBarProps = {
    leftSideContent?: ReactNode[];
    rightSideContent?: ReactNode[];
};

export default function StatusBar({
    leftSideContent = [],
    rightSideContent = []
}: StatusBarProps) {
    return (
        <div
            className="relative w-full h-8 flex items-center px-4 text-white border-t border-primary-50"
            style={{ backdropFilter: `blur(${StaticConfig.blurs.statusBar}px)` }}
        >
            <div
                className="-z-10 absolute inset-0 bg-primary-500"
                style={{ opacity: StaticConfig.opacities.statusBar }}
            />

            <div className="flex-grow flex items-center justify-start gap-4">
                {leftSideContent.map((content, index) => (
                    <p key={index} className="font-medium text-xs">
                        {content}
                    </p>
                ))}
            </div>

            <div className="flex-grow flex items-center justify-end gap-4">
                {rightSideContent.map((content, index) => (
                    <p key={index} className="font-medium text-xs">
                        {content}
                    </p>
                ))}
            </div>
        </div>
    );
}