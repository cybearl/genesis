import Image from "next/image";


export default function Background() {
    return (
        <div className="absolute -z-10 inset-0 bg-primary-300 w-full h-full">
            <Image
                src="/static/images/background.webp"
                alt="Genesis"
                fill
                objectFit="contain"
                className="drop-shadow-2xl p-32"
            />
        </div>
    );
}