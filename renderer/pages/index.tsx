import { useMemo, useState } from "react";

import Layout from "@/components/structure/Layout";
import Account from "@/pages/account";
import BotInstances from "@/pages/bot-instances";
import DeveloperMode from "@/pages/developer-mode";
import DryRunSandbox from "@/pages/dry-run-sandbox";
import MarketDataFeed from "@/pages/market-data-feed";
import RealTimeMarket from "@/pages/real-time-market";
import Settings from "@/pages/settings";
import StrategyScoring from "@/pages/strategy-scoring";
import Toolbox from "@/pages/toolbox";


export default function Index() {
    const [currentPage, setCurrentPage] = useState(0);

    const pages = useMemo(() => [
        // TOP NAV
        <RealTimeMarket key={0} />,
        <MarketDataFeed key={1} />,
        <StrategyScoring key={2} />,
        <DryRunSandbox key={3} />,
        <BotInstances key={4} />,
        <Toolbox key={5} />,

        // BOTTOM NAV
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
                        icon: "material-symbols:finance-mode-rounded"
                    },
                    {
                        label: "Market data feed",
                        icon: "material-symbols:document-scanner-outline-rounded"
                    },
                    {
                        label: "Strategy scoring",
                        icon: "material-symbols:strategy-outline-rounded"
                    },
                    {
                        label: "Dry-run sandbox",
                        icon: "material-symbols:cool-to-dry"
                    },
                    {
                        label: "Bot instances",
                        icon: "material-symbols:robot"
                    },
                    {
                        label: "Toolbox",
                        icon: "material-symbols:service-toolbox-rounded"
                    }
                ],
                bottomButtons: [
                    {
                        label: "Account",
                        icon: "material-symbols:account-circle"
                    },
                    {
                        label: "Settings",
                        icon: "material-symbols:settings-rounded"
                    }
                ],
                devOnlyButtons: [
                    {
                        label: "Developer mode",
                        icon: "material-symbols:developer-board-outline-rounded",
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