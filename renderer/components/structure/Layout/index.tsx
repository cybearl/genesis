import CloseIcon from "@mui/icons-material/Close";
import { ReactNode } from "react";


type LayoutProps = {
    children: ReactNode;
};

export default function Layout({
    children
}: LayoutProps) {
    return (
        <div className="w-full h-screen min-h-screen select-none">
            <p>Layout</p>
            <CloseIcon />

            <main>
                {children}
            </main>
        </div>
    );
}