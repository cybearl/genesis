type TabProps = {
    label: string;

    isActive?: boolean;
    isCloseable?: boolean;
};

export default function Tab({
    label,

    isActive = false,
    isCloseable = false
}: TabProps) {
    return (
        <div className={`
            h-full flex justify-center items-center px-4 text-white
            ${isActive ? "bg-neutral-950" : "bg-neutral-950"}
        `}>
            {label}
        </div>
    );
}