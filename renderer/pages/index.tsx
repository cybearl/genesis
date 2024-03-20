import { Icon } from "@iconify/react";
import { useMemo, useState } from "react";

import Layout from "@/components/structure/Layout";
import Account from "@/pages/account";
import BotInstances from "@/pages/bot-instances";
import DeveloperMode from "@/pages/developer-mode";
import DryRunSandbox from "@/pages/dry-run-sandbox";
import Help from "@/pages/help";
import MarketDataFeed from "@/pages/market-data-feed";
import RealTimeMarket from "@/pages/real-time-market";
import Settings from "@/pages/settings";
import StrategyScoring from "@/pages/strategy-scoring";


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
            sidebar={{
                topButtons: [
                    {
                        label: "Real-time market",
                        icon: <Icon icon="material-symbols:finance-mode-rounded" />
                    },
                    {
                        label: "Market data feed",
                        icon: <Icon icon="material-symbols:document-scanner-outline-rounded" />
                    },
                    {
                        label: "Strategy scoring",
                        icon: <Icon icon="material-symbols:strategy-outline-rounded" />
                    },
                    {
                        label: "Dry-run sandbox",
                        icon: <Icon icon="material-symbols:cool-to-dry" />
                    },
                    {
                        label: "Bot instances",
                        icon: <Icon icon="material-symbols:robot" />
                    }
                ],
                bottomButtons: [
                    {
                        label: "Help",
                        icon: <Icon icon="material-symbols:help-outline-rounded" />
                    },
                    {
                        label: "Account",
                        icon: <Icon icon="material-symbols:account-circle" />
                    },
                    {
                        label: "Settings",
                        icon: <Icon icon="material-symbols:settings-rounded" />
                    }
                ],
                devOnlyButtons: [
                    {
                        label: "Developer mode",
                        icon: <Icon icon="material-symbols:developer-board-outline-rounded" />,
                        textColor: "text-yellow-500"
                    }
                ]
            }}
            onSidebarButtonClick={(index) => setCurrentPage(index)}
            currentPage={currentPage}
        >
            {pages[currentPage]}
        </Layout>
    );
}