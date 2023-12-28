import Image from "next/image";


type BackgroundProps = {
    imgOpacity?: number;
    imgBlur?: number;
};

export default function Background({
    imgOpacity = 0.2,
    imgBlur = 4
}: BackgroundProps) {
    return (
        <div className="absolute -z-10 inset-0  w-full h-full flex items-center justify-center bg-black">
            <div className="absolute min-w-[200vw] aspect-square">
                <Image
                    src="/static/images/background/cybearl.webp"
                    alt="Cybearl background"
                    fill
                    className="overflow-visible object-cover"
                    style={{
                        filter: `opacity(${imgOpacity}) blur(${imgBlur}px)`
                    }}
                />
            </div>
        </div>
    );
}