import { ReactNode } from "react";


type ButtonProps = {
    label: string;
    icon: ReactNode;
    onClick: () => void;
};

export default function Button({
    label,
    icon,
    onClick
}: ButtonProps) {
    return (
        <div className="">

        </div>
    );
}