import { expect } from "chai";
import date from "date-and-time";
import { describe, it } from "mocha";

import { GENERAL_CONFIG } from "configs/global.config";
import * as inputs from "helpers/inputs";
import logger from "utils/logger";


// Silencing the logger
logger.transports.forEach((t) => (t.silent = true));


describe("inputs.ts", () => {
    describe("sha256()", () => {
        it("Should give a string hash of the input.", () => {
            expect(inputs.sha256("Rompish"))
                .is.a("string");
        });

        it("Should give the proper SHA256 string hash of the input.", () => {
            expect(inputs.sha256("Rompish"))
                .is.eql("23fb1cb600850c3b9bd5c5fd");
        });
    });

    describe("getObjectId()", () => {
        it("Should give the string ID of the input.", () => {
            expect(inputs.getObjectId(false, "Rompish"))
                .is.a("string");
        });

        it("Should give the string ID of the input in sandbox mode.", () => {
            expect(inputs.getObjectId(true, "Rompish"))
                .is.eql("a9bdc80edbaf6a2dba6237d5");
        });

        it("Should give the string ID of the input without sandbox mode on.", () => {
            expect(inputs.getObjectId(false, "Rompish"))
                .is.eql("23fb1cb600850c3b9bd5c5fd");
        });
    });

    describe("getUserInput()", () => {
        it("Should give the string answer of the input.", async () => {
            expect(await inputs.getUserInput("Do you agree ? (y/n)"))
                .is.eql("y");
        });
    });

    describe("getTimeframe()", () => {
        it("Should give a number of ms.", () => {
            expect(inputs.getTimeframe("1m"))
                .is.a("number");
        });

        it("Should give the number of ms of the input.", () => {
            expect(inputs.getTimeframe("1m"))
                .is.eql(60000);
        });
    });

    describe("getCurrentDateString()", () => {
        it("Should give a string.", () => {
            expect(inputs.getCurrentDateString())
                .is.a("string");
        });

        it("Should give the current date string.", () => {
            expect(inputs.getCurrentDateString())
                .is.eql(date.format(new Date(), GENERAL_CONFIG.dateFormat));
        });
    });
});