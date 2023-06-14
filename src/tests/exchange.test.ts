import "configs/env";

import { Exchange } from "ccxt";
import { expect } from "chai";
import { describe, it } from "mocha";

import * as exchange from "helpers/exchange";
import logger from "utils/logger";


// Silencing the logger
logger.transports.forEach((t) => (t.silent = true));


describe("exchange.ts", () => {
    let exchangeObj: Exchange;
    let exchangeObjSandbox: Exchange;

    beforeEach(() => {
        exchangeObj = exchange.loadExchange(false);
        exchangeObjSandbox = exchange.loadExchange(true);
    });

    describe("parseTradingPair", () => {
        it("Should give an object.", () => {
            expect(exchange.parseTradingPair("BTC/USDT"))
                .is.an("object");
        });

        it("Should give the proper object.", () => {
            expect(exchange.parseTradingPair("BTC/USDT"))
                .is.eql({ base: "BTC", quote: "USDT" });
        });
    });

    describe("loadExchange()", () => {
        it("Should give an object.", () => {
            expect(exchange.loadExchange(true))
                .is.an("object");
        });
    });

    describe("checkExchangeStatus()", () => {
        it("Should give a boolean.", async () => {
            expect(await exchange.checkExchangeStatus(exchangeObjSandbox))
                .is.a("boolean");
        });

        it("Should give the proper boolean in sandbox mode.", async () => {
            expect(await exchange.checkExchangeStatus(exchangeObjSandbox))
                .is.eql(true);
        });

        it("Should give the proper boolean without sandbox mode on.", async () => {
            expect(await exchange.checkExchangeStatus(exchangeObj))
                .is.eql(true);
        });
    });

    describe("loadBalances()", () => {
        it("Should give an object.", async () => {
            expect(await exchange.loadBalances(exchangeObjSandbox))
                .is.an("object");
        });

        it("Should return an object containing the information about the user account", async () => {
            expect(await exchange.loadBalances(exchangeObjSandbox))
                .is.an("object")
                .with.property("info");
        });
    });

    describe("getBalance()", () => {
        it("Should return an object containing the information about the user balances", async () => {
            const balances = await exchange.loadBalances(exchangeObjSandbox);
            expect(await exchange.getBalance(balances, "BTC"))
                .is.an("object")
                .with.property("free");
        });
    });

    describe("fetchTicker()", async () => {
        it("Should give an object.", async () => {
            expect(await exchange.fetchTicker(exchange.loadExchange(true), "BTC/USDT"))
                .is.an("object");
        });
    });

    describe("fetchOrderBook()", () => {
        it("Should give an object.", async () => {
            expect(await exchange.fetchOrderBook(exchange.loadExchange(true), "BTC/USDT"))
                .is.an("object");
        });
    });

    describe("fetchTrades()", () => {
        it("Should give an array.", async () => {
            expect(await exchange.fetchTrades(exchange.loadExchange(true), "BTC/USDT"))
                .is.an("array");
        });
    });

    describe("fetchOHLCV()", () => {
        it("Should give an array.", async () => {
            expect(await exchange.fetchOHLCV(exchange.loadExchange(true), "BTC/USDT"))
                .is.an("array");
        });
    });

    describe("precalculateFees()", () => {
        it("Should give an object.", async () => {
            expect(await exchange.precalculateFees(exchange.loadExchange(true), "BTC/USDT", "market", "buy", 0.001))
                .is.an("object");
        });
    });

    describe("exchangeTimeDifference()", () => {
        it("Should give a number.", async () => {
            expect(await exchange.exchangeTimeDifference(exchange.loadExchange(true)))
                .is.a("number");
        });
    });
});