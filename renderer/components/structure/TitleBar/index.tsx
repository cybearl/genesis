import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";

import TitleBarButton from "@/components/base/Button/TitleBarButton";


export default function TitleBar() {
    return (
        <div className="w-full bg-red-500 flex items-center justify-between pl-2">
            <h1>TEST</h1>

            <div className="flex p-0 m-0">
                <TitleBarButton
                    label="Minimize"
                    icon={<HorizontalRuleIcon className="!text-lg" />}
                />
                <TitleBarButton
                    label="Minimize"
                    icon={<HorizontalRuleIcon />}
                />
                <TitleBarButton
                    label="Minimize"
                    icon={<HorizontalRuleIcon />}
                />
            </div>
        </div>
    );
}