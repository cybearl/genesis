import { Icon } from "@iconify/react";


type TabProps = {
    label: string;

    isActive?: boolean;
    isCloseable?: boolean;

    onClick?: () => void;
    onClose?: () => void;
};

export default function Tab({
    label,

    isActive = false,
    isCloseable = false,

    onClick,
    onClose
}: TabProps) {
    return (
        <div
            className={`relative h-full flex justify-center items-center w-full pt-2 pb-1.5 transition-all ease-in-out duration-150 ${!isActive && "cursor-pointer"}`}
            onClick={onClick}
        >
            <div className={`${isActive ? "text-white font-normal" : "text-neutral-600 font-semibold"}`}>
                {label}
            </div>

            {(isActive && isCloseable) && (
                <button
                    className="absolute right-4 leading-none child:text-xl child:text-neutral-500 child:hover:text-neutral-300 child:active:text-white"
                    onClick={(e) => {
                        e.stopPropagation();
                        onClose?.();
                    }}
                >
                    <Icon icon="material-symbols:close-rounded" />
                </button>
            )}
        </div>
    );
}