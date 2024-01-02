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
            bg-black bg-opacity-[0.92] backdrop-blur-lg text-neutral-500
        `}>
            <div className="flex-grow flex items-center justify-start gap-6">
                {leftSideContent.map((content, index) => (
                    <p key={index} className="font-semibold tracking-wider text-sm">
                        {content}
                    </p>
                ))}
            </div>

            <div className="flex-grow flex items-center justify-end gap-6">
                {rightSideContent.map((content, index) => (
                    <p key={index} className="font-semibold tracking-wider text-sm">
                        {content}
                    </p>
                ))}
            </div>
        </div>
    );
}