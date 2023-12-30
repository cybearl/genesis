import WorkHistoryIcon from "@mui/icons-material/WorkHistory";

import Layout from "@/components/structure/Layout";


export default function Index() {
    return (
        <Layout
            navButtons={[
                {
                    label: "Work History",
                    icon: <WorkHistoryIcon />
                },
                {
                    label: "Work History",
                    icon: <WorkHistoryIcon />
                },
                {
                    label: "Work History",
                    icon: <WorkHistoryIcon />
                },
                {
                    label: "Work History",
                    icon: <WorkHistoryIcon />
                }
            ]}
            onNavButtonClick={(label) => {
                console.log(label);
            }}
        >

        </Layout>
    );
}