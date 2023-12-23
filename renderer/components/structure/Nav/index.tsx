import Logo from "@/components/base/Logo";
import CONFIG from "@/configs/app.config";


export default function Nav() {
    return (
        <nav className="w-full px-4 flex justify-between items-end">
            <div className="py-4 flex flex-col justify-center gap-1 text-center">
                <div className="flex gap-3 items-center justify-center">
                    <Logo size="md" />

                    <div className="flex flex-col items-center">
                        <h1 className="text-3xl font-semibold leading-none">
                            {CONFIG.appName}
                        </h1>

                        <div className="flex w-full justify-center items-center gap-2">
                            <hr className="flex-grow" />

                            <p className="text-sm">
                                {CONFIG.appSubName}
                            </p>

                            <hr className="flex-grow" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="h-full pb-1">
                <p className="text-xl font-semibold">
                    <span className="text-sm pr-0.5">v</span>
                    {CONFIG.appVersion}
                </p>
            </div>
        </nav>
    );
}