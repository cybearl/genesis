import Image from "next/image";


export default function Background() {
    return (
        <div className="absolute -z-10 inset-0 bg-black w-full h-full flex items-center justify-center">
            <div className="absolute min-w-[200vw] aspect-square">
                <Image
                    src="/static/images/background/cybearl.webp"
                    alt="Cybearl background"
                    fill
                    objectFit="cover"
                    className="opacity-20 overflow-visible blur-xl"
                />
            </div>
        </div>
    );
}