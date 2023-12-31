import ScoreboardIcon from "@mui/icons-material/Scoreboard";
import SettingsIcon from "@mui/icons-material/Settings";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import StoreIcon from "@mui/icons-material/Store";
import { useState } from "react";

import Layout from "@/components/structure/Layout";
import BotInstances from "@/pages/BotInstances";
import MarketDataFeed from "@/pages/MarketDataFeed";
import Settings from "@/pages/Settings";
import StrategyScoring from "@/pages/StrategyScoring";


export default function Index() {
    const [currentPage, setCurrentPage] = useState(0);

    const pages = [
        <MarketDataFeed key={0} />,
        <StrategyScoring key={1} />,
        <BotInstances key={2} />,
        <Settings key={4} />
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
                    label: "Bot instances",
                    icon: <SmartToyIcon />
                },
                {
                    label: "Settings",
                    icon: <SettingsIcon />
                }
            ]}
            onNavButtonClick={(index) => setCurrentPage(index)}
            currentPage={currentPage}
        >
            {pages[currentPage]}
        </Layout>
    );
}