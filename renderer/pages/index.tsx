import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BugReportIcon from "@mui/icons-material/BugReport";
import DeveloperBoardIcon from "@mui/icons-material/DeveloperBoard";
import HelpIcon from "@mui/icons-material/Help";
import ScoreboardIcon from "@mui/icons-material/Scoreboard";
import SettingsIcon from "@mui/icons-material/Settings";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import StoreIcon from "@mui/icons-material/Store";
import { useMemo, useState } from "react";

import Layout from "@/components/structure/Layout";
import Account from "@/pages/Account";
import BotInstances from "@/pages/BotInstances";
import DeveloperMode from "@/pages/DeveloperMode";
import DryRunSandbox from "@/pages/DryRunSandbox";
import Help from "@/pages/Help";
import MarketDataFeed from "@/pages/MarketDataFeed";
import Settings from "@/pages/Settings";
import StrategyScoring from "@/pages/StrategyScoring";


export default function Index() {
    const [currentPage, setCurrentPage] = useState(0);

    const pages = useMemo(() => [
        <MarketDataFeed key={0} />,
        <StrategyScoring key={1} />,
        <DryRunSandbox key={2} />,
        <BotInstances key={3} />,
        <Help key={4} />,
        <Account key={5} />,
        <Settings key={6} />,
        <DeveloperMode key={7} />
    ], []);

    return (
        <Layout
            topNavButtons={[
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
                }
            ]}
            bottomNavButtons={[
                {
                    label: "Help",
                    icon: <HelpIcon />
                },
                {
                    label: "Account",
                    icon: <AccountCircleIcon />
                },
                {
                    label: "Settings",
                    icon: <SettingsIcon />
                }
            ]}
            devOnlyNavButtons={[
                {
                    label: "Developer mode",
                    icon: <DeveloperBoardIcon />
                }
            ]}
            onNavButtonClick={(index) => setCurrentPage(index)}
            currentPage={currentPage}
        >
            {pages[currentPage]}
        </Layout>
    );
}