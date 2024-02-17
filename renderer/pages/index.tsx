import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BugReportIcon from "@mui/icons-material/BugReport";
import DeveloperBoardIcon from "@mui/icons-material/DeveloperBoard";
import HelpIcon from "@mui/icons-material/Help";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import ScoreboardIcon from "@mui/icons-material/Scoreboard";
import SettingsIcon from "@mui/icons-material/Settings";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { useMemo, useState } from "react";

import Layout from "@/components/structure/Layout";
import Account from "@/pages/Account";
import BotInstances from "@/pages/BotInstances";
import DeveloperMode from "@/pages/DeveloperMode";
import DryRunSandbox from "@/pages/DryRunSandbox";
import Help from "@/pages/Help";
import MarketDataFeed from "@/pages/MarketDataFeed";
import RealTimeMarket from "@/pages/RealTimeMarket";
import Settings from "@/pages/Settings";
import StrategyScoring from "@/pages/StrategyScoring";


export default function Index() {
    const [currentPage, setCurrentPage] = useState(0);

    const pages = useMemo(() => [
        // TOP NAV
        <RealTimeMarket key={0} />,
        <MarketDataFeed key={1} />,
        <StrategyScoring key={2} />,
        <DryRunSandbox key={3} />,
        <BotInstances key={4} />,

        // BOTTOM NAV
        <Help key={5} />,
        <Account key={6} />,
        <Settings key={7} />,
        <DeveloperMode key={8} />
    ], []);

    return (
        <Layout
            topNavButtons={[
                {
                    label: "Real-time market",
                    icon: <AccountBalanceIcon />
                },
                {
                    label: "Market data feed",
                    icon: <PriceChangeIcon />
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