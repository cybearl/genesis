import { ReactNode } from "react";


type IconButtonProps = {
    icon: ReactNode;
    onClick?: () => void;
};

export default function IconButton({
    icon,
    onClick
}: IconButtonProps) {
    return (
        <button
            className=""
            onClick={onClick}
        >
            {icon}
        </button>
    );
}