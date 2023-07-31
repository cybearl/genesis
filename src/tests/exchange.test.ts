import "configs/env";

import { Exchange as Market } from "ccxt";
import { expect } from "chai";
import { describe, it } from "mocha";

import * as market from "helpers/market";
import logger from "utils/logger";


// Silencing the logger
logger.transports.forEach((t) => (t.silent = true));


describe("market.ts", () => {
    let marketObj: Market;
    let marketObjSandbox: Market;

    beforeEach(() => {
        marketObj = market.loadMarket(false);
        marketObjSandbox = market.loadMarket(true);
    });

    describe("parseTradingPair", () => {
        it("Should give an object.", () => {
            expect(market.parseTradingPair("BTC/USDT"))
                .is.an("object");
        });

        it("Should give the proper object.", () => {
            expect(market.parseTradingPair("BTC/USDT"))
                .is.eql({ base: "BTC", quote: "USDT" });
        });
    });

    describe("loadMarket()", () => {
        it("Should give an object.", () => {
            expect(market.loadMarket(true))
                .is.an("object");
        });
    });

    describe("checkMarketStatus()", () => {
        it("Should give a boolean.", async () => {
            expect(await market.checkMarketStatus(marketObjSandbox))
                .is.a("boolean");
        });

        it("Should give the proper boolean in sandbox mode.", async () => {
            expect(await market.checkMarketStatus(marketObjSandbox))
                .is.eql(true);
        });

        it("Should give the proper boolean without sandbox mode on.", async () => {
            expect(await market.checkMarketStatus(marketObj))
                .is.eql(true);
        });
    });

    describe("fetchTicker()", async () => {
        it("Should give an object.", async () => {
            expect(await market.fetchTicker(market.loadMarket(true), "BTC/USDT"))
                .is.an("object");
        });
    });

    describe("fetchOrderBook()", () => {
        it("Should give an object.", async () => {
            expect(await market.fetchOrderBook(market.loadMarket(true), "BTC/USDT"))
                .is.an("object");
        });
    });

    describe("fetchTrades()", () => {
        it("Should give an array.", async () => {
            expect(await market.fetchTrades(market.loadMarket(true), "BTC/USDT"))
                .is.an("array");
        });
    });

    describe("fetchOHLCV()", () => {
        it("Should give an array.", async () => {
            expect(await market.fetchOHLCV(market.loadMarket(true), "BTC/USDT"))
                .is.an("array");
        });
    });

    describe("marketTimeDifference()", () => {
        it("Should give a number.", async () => {
            expect(await market.marketTimeDifference(market.loadMarket(true)))
                .is.a("number");
        });
    });
});