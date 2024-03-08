import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

import IconButton from "@/components/base/IconButton";


export default function Settings() {
    const test = async () => {
        const test = await window.ipcFetch("/api/sysinfo");
        console.log(test);
    };

    return (
        <div className="w-full h-full">
            <IconButton
                icon={<AccountBalanceIcon />}
                onClick={() => test()}
            />
        </div>
    );
}