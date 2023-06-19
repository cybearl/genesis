declare namespace NsGeneral {
    /**
     * Valid timeframes for Binance.
     */
    type IsTimeframe = "1s" | "30s" | "1m" | "3m" | "5m" | "15m" | "30m" | "1h" | "2h" | "4h" | "1d";

    /**
     * Options for the generator system function.
     */
    interface generatorSystemOptions {
        help: boolean;
        dataPath: string;
        pair: string;
        timeframe: NsGeneral.IsTimeframe;
        since: number;
        entriesPerPage: number;
    }

    /**
     * Options for the historical scoring system function (HSS).
     */
    interface historicalScoringSystemOptions {
        help: boolean;
        show: boolean;
        dataPath: string;
        scorePath: string;
        query: string;
    }
}


export default NsGeneral;