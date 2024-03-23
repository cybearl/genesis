import { Icon } from "@iconify/react";


type ValueWithIconProps = {
    title: string;
    icon: string;
    value: string | null | undefined;

    isLoading?: boolean;
};

export default function ValueWithIcon({
    title,
    icon,
    value,

    isLoading = false
}: ValueWithIconProps) {
    return (
        <span title={title} className="flex justify-center items-center">
            <Icon icon={icon} inline className="text-lg mr-1" />
            {(!isLoading && value) ? value : "..."}
        </span>
    );
}

