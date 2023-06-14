import {
    Balance,
    Balances,
    Exchange,
} from "ccxt";
import { Db } from "mongodb";

import Cache from "classes/cache";
import NsGeneral from "types/general";


declare namespace NsBotObject {
    /**
     * MongoDB data.
     */
    interface IsMongoDB {
        mongoClient: MongoClient | null;
        mongoDB: Db | null;
    }

    /**
     * Interface for a trade object (contains info about a trade).
     */
    interface IsTradeObject {
        timestamp: number;
        date: string;
        currency: string;
        side: string;
        price: number;
        amount: number;
        fee: number;
    }

    /**
     * botObject start interface.
     */
    interface IsBotObjectStart {
        name: string;
        id: string;
        timeframe: number;
        ohlcvLimit: number;
        sandbox: boolean;

        tradingPair: string;
        baseCurrency: string;
        baseBalance: Balance | null;
        quoteCurrency: string;
        quoteBalance: Balance | null;
        initialQuoteBalance: number;

        lastStartTime: string;
    }

    /**
     * botObject stop interface.
     */
    interface IsBotObjectStop {
        lastStopTime: string;
    }

    /**
     * botObject shared arrays interface.
     */
    interface IsBotObjectSharedArrays {
        tradeSizes: number[];
        tradeDurations: number[];
        tradeProfits: number[];
        feesPerTrade: number[];
        dailyProfits: number[];
        history: IsTradeObject[];
    }

    /**
     * botObject shared interface.
     */
    interface IsBotObjectShared {
        arrays: IsBotObjectSharedArrays;

        generalIterations: number;
        mainIterations: number;

        tradeSuccessRate: number;
        maxDrawdown: number;
        maxConsecutiveWins: number;
        maxConsecutiveLosses: number;

        totalTrades: number;
        totalTradesWon: number;
        totalTradesLost: number;
        totalTradeVolume: number;
        totalFees: number;
        totalProfit: number;

        avgTradeSize: number;
        avgTradeDuration: number;
        avgTradeProfit: number;
        avgFeePerTrade: number;
        avgDailyProfitPercentage: number;
    }

    /**
     * botObject local interface.
     */
    interface IsBotObjectLocal {
        initialized: Promise<void>;
        stringTimeframe: NsGeneral.IsTimeframe;
        running: boolean;
        networkCheck: boolean;
        exchange: Exchange | null;
        balances: Balances | null;
        cache: Cache | null;
    }

    /**
     * botObject specials interface.
     */
    interface IsBotObjectSpecials {
        initTime: string;
        lastSharedUpdate: string;

        mainTimeframeCorrector: number;
        timeDifference: number;
    }

    /**
     * botObject main interface.
     */
    interface IsBotObject {
        start: IsBotObjectStart;
        stop: IsBotObjectStop;
        shared: IsBotObjectShared;
        local: IsBotObjectLocal;
        specials: IsBotObjectSpecials;
    }
}


export default NsBotObject;