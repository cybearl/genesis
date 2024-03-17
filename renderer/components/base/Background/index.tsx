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
        <div className="absolute -z-10 inset-0 w-full h-full flex items-center justify-center">
            <div className="absolute w-full h-full">
                <Image
                    src="/static/images/background/grayscale.webp"
                    alt="Cybearl background"
                    fill
                    className="overflow-visible object-contain"
                    style={{
                        filter: `opacity(${imgOpacity}) blur(${imgBlur}px)`
                    }}
                />
            </div>
        </div>
    );
}