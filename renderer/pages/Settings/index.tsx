import Tabs from "@/components/general/Tabs";


export default function Settings() {
    return (
        <div className="w-full min-h-full">
            <Tabs
                labels={["General", "Appearance", "Advanced"]}
                tabs={[
                    <div key={0}>General</div>,
                    <div key={1}>Appearance</div>,
                    <div key={2}>Advanced</div>
                ]}
            />
        </div>
    );
}