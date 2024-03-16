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
            w-full h-8 flex items-center px-4 border-t border-secondary-800
            bg-secondary-1000 bg-opacity-[0.92] backdrop-blur-lg text-secondary-300
        `}>
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