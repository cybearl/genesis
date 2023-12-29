import { ReactNode } from "react";


type BottomBarProps = {
    leftSideContent?: ReactNode[];
    rightSideContent?: ReactNode[];
};

export default function BottomBar({
    leftSideContent = [],
    rightSideContent = []
}: BottomBarProps) {
    return (
        <div className={`
            w-full h-8 flex items-center px-4 border-t border-neutral-800
            bg-black bg-opacity-80 backdrop-blur-lg
        `}>
            <div className="flex-grow flex items-center justify-start gap-2">
                {leftSideContent}
            </div>

            <div className="flex-grow flex items-center justify-end gap-2">
                {rightSideContent}
            </div>
        </div>
    );
}