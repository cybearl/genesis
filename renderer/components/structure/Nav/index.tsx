import CONFIG from "@/configs/app.config";


export default function Nav() {
    return (
        <nav className="w-full px-2 flex justify-between items-start">
            <p>
                {CONFIG.producer}
            </p>

            <p className="text-base font-light">
                <span className="text-sm pr-0.5">
                    v
                </span>
                {CONFIG.appVersion}
            </p>
        </nav>
    );
}