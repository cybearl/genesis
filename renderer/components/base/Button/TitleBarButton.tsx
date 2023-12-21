import { ReactNode } from "react";


type TitleBarButtonProps = {
    label: string;
    icon: ReactNode;
    onClick?: () => void;
};

export default function TitleBarButton({
    label,
    icon,
    onClick = undefined
}: TitleBarButtonProps) {
    return (
        <button
            name={label}
            title={label}
            type="button"
            onClick={onClick}
            className="px-3 py-1 bg-blue-500 flex items-center justify-center"
        >
            {icon}
        </button>
    );
}