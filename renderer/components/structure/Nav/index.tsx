import Logo from "@/components/base/Logo";
import CONFIG from "@/configs/app.config";


export default function Nav() {
    return (
        <nav className="w-full px-4 flex justify-between items-end">
            <div className="py-4">
                <div className="flex gap-2 items-center justify-center">
                    <Logo size="sm" />

                </div>

                <div>
                </div>

            </div>

            <div className="h-full pb-2">
                <p className="text-xl">
                    <span className="text-sm pr-0.5">v</span>
                    {CONFIG.appVersion}
                </p>
            </div>
        </nav>
    );
}