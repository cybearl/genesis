import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import ScoreboardIcon from "@mui/icons-material/Scoreboard";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import StoreIcon from "@mui/icons-material/Store";
import { useState } from "react";

import Layout from "@/components/structure/Layout";
import AccountCenter from "@/pages/AccountCenter";
import CreateANewBot from "@/pages/CreateANewBot";
import MarketDataFeed from "@/pages/MarketDataFeed";
import MyBotInstances from "@/pages/MyBotInstances";
import StrategyScoring from "@/pages/StrategyScoring";


export default function Index() {
    const [currentPage, setCurrentPage] = useState(0);

    const pages = [
        <MarketDataFeed key={0} />,
        <StrategyScoring key={1} />,
        <MyBotInstances key={2} />,
        <CreateANewBot key={3} />,
        <AccountCenter key={4} />
    ];

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
                },
                {
                    label: "Account / Center",
                    icon: <AdminPanelSettingsIcon />
                }
            ]}
            onNavButtonClick={(index) => setCurrentPage(index)}
            currentPage={currentPage}
        >
            {pages[currentPage]}
        </Layout>
    );
}