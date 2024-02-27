import Loading from "@/components/general/Loading";
import Tabs from "@/components/general/Tabs";


export default function Settings() {

    return (
        <div className="w-full h-full">
            {/* <Tabs labels={["General", "Appearance", "Advanced"]} /> */}
            <Loading size="sm" />
            <Loading size="md" />
            <Loading size="lg" />
            <Loading size="xl" />
        </div>
    );
}