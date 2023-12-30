import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import ScoreboardIcon from "@mui/icons-material/Scoreboard";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import StoreIcon from "@mui/icons-material/Store";
import { useState } from "react";

import Layout from "@/components/structure/Layout";


export default function Index() {
    const [currentPage, setCurrentPage] = useState(0);

    return (
        <Layout
            navButtons={[
                {
                    label: "Market data feed",
                    icon: <StoreIcon />
                },
                {
                    label: "Strategy scoring",
                    icon: <ScoreboardIcon />
                },
                {
                    label: "My bot instances",
                    icon: <PrecisionManufacturingIcon />
                },
                {
                    label: "Create a new bot",
                    icon: <SmartToyIcon />
                }
            ]}
            onNavButtonClick={(index) => setCurrentPage(index)}
            currentPage={currentPage}
        >

        </Layout>
    );
}