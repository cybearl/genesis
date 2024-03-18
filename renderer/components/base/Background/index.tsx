import Image from "next/image";


type BackgroundProps = {
    layerOneOpacity: number;
    layerOneBlur: number;
    layerTwoOpacity: number;
    layerTwoBlur: number;
};

export default function Background({
    layerOneOpacity,
    layerOneBlur,
    layerTwoOpacity,
    layerTwoBlur
}: BackgroundProps) {
    return (
        <div className="absolute -z-10 inset-0 w-full h-full flex items-center justify-center">
            <div className="absolute w-full h-full">
                <Image
                    src="/static/images/background/grayscale.webp"
                    alt="Cybearl background"
                    fill
                    className="overflow-visible object-cover"
                    style={{ filter: `opacity(${layerOneOpacity}) blur(${layerOneBlur}px)` }}
                />
            </div>

            <div className="absolute w-full h-full">
                <Image
                    src="/static/images/background/grayscale.webp"
                    alt="Cybearl background"
                    fill
                    className="overflow-visible object-contain"
                    style={{ filter: `opacity(${layerTwoOpacity}) blur(${layerTwoBlur}px)` }}
                />
            </div>
        </div>
    );
}