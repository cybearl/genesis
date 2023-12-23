import Image from "next/image";


export default function Background() {
    return (
        <div className="absolute -z-10 inset-0 bg-primary-1200 w-full h-full flex items-center justify-center">
            <div className="absolute min-w-[200vw] aspect-square">
                <Image
                    src="/static/images/background/cybearl.webp"
                    alt="Genesis"
                    fill
                    objectFit="cover"
                    className="opacity-30 overflow-visible"
                />
            </div>

            <div className="relative w-full h-full">
                <Image
                    src="/static/images/background/cybearl.webp"
                    alt="Genesis"
                    fill
                    objectFit="contain"
                    className="opacity-40"
                />
            </div>
        </div>
    );
}