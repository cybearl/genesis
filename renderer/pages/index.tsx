import BugReportIcon from "@mui/icons-material/BugReport";
import HelpIcon from "@mui/icons-material/Help";
import ScoreboardIcon from "@mui/icons-material/Scoreboard";
import SettingsIcon from "@mui/icons-material/Settings";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import StoreIcon from "@mui/icons-material/Store";
import { useState } from "react";

import Layout from "@/components/structure/Layout";
import BotInstances from "@/pages/BotInstances";
import DryRunSandbox from "@/pages/DryRunSandbox";
import MarketDataFeed from "@/pages/MarketDataFeed";
import Settings from "@/pages/Settings";
import StrategyScoring from "@/pages/StrategyScoring";
import Support from "@/pages/Support";


export default function Index() {
    const [currentPage, setCurrentPage] = useState(0);

    const pages = [
        <MarketDataFeed key={0} />,
        <StrategyScoring key={1} />,
        <DryRunSandbox key={2} />,
        <BotInstances key={3} />,
        <Settings key={4} />,
        <Support key={5} />
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
                    label: "Dry-run sandbox",
                    icon: <BugReportIcon />
                },
                {
                    label: "Bot instances",
                    icon: <SmartToyIcon />
                },
                {
                    label: "Settings",
                    icon: <SettingsIcon />
                },
                {
                    label: "Support",
                    icon: <HelpIcon />
                }
            ]}
            onNavButtonClick={(index) => setCurrentPage(index)}
            currentPage={currentPage}
        >
            {pages[currentPage]}
        </Layout>
    );
}