import { expect } from "chai";
import lodash from "lodash";
import { describe, it } from "mocha";
import { Db, MongoClient } from "mongodb";

import { botObject } from "configs/botObject.config";
import { NETWORK_CONFIG } from "configs/global.config";
import { getObjectId } from "helpers/inputs";
import * as network from "helpers/network";
import logger from "utils/logger";
import { generateRandomBotName, generateRandomNumber } from "utils/random";


// Silencing the logger
logger.transports.forEach((t) => (t.silent = true));

describe("network.ts", () => {
    const randomBotName = generateRandomBotName();

    describe("checkNetwork()", () => {
        it("Should return a boolean, depending if the network test has successfully passed or not", async () => {
            expect(await network.checkNetwork(false),"The returned value should be a boolean")
                .is.a("boolean");
        });
    });

    describe("connectToDB()", () => {
        let mongoDB: Db | null;
        let mongoClient: MongoClient | null;

        beforeEach(async () => {
            // Assign the DB instance to the mongoDB variable
            ({ mongoDB, mongoClient } = await network.connectToDB(false, "tests"));
        });

        it("Should return 'null' if the connection fails (wrong database name)", async () => {
            const { mongoDB } = await network.connectToDB(false, "wrongDBName");

            expect(mongoDB, "MongoDB instance should be null")
                .is.null;
        });

        it("Should return the DB instance if connected successfully", async () => {
            if (mongoDB !== null) {
                expect(mongoDB, "MongoDB instance should be an object")
                    .is.a("object");
            }
        });

        it(`Should return the DB instance containing the '${NETWORK_CONFIG.botObjectsCollection}' collection`, async () => {
            if (mongoDB !== null) {
                // Get the list of collections and their names
                const collections = await mongoDB.collections();
                const collectionNames = collections.map((collection) => collection.collectionName);

                expect(collectionNames.includes(NETWORK_CONFIG.botObjectsCollection), "The collection name should be in the list of collections")
                    .to.be.true;
            }
        });

        afterEach(() => {
            if (mongoClient !== null) {
                network.closeDBConnection(mongoClient);
            }
        });
    });

    describe("checkBotObjectExistenceInDB()", () => {
        let mongoDB: Db | null;
        let mongoClient: MongoClient | null;

        beforeEach(async () => {
            // Assign the DB instance to the mongoDB variable
            ({ mongoDB, mongoClient } = await network.connectToDB(false, "tests"));
        });

        it("Should return a boolean, depending if the bot object exists or not", async () => {
            if (mongoDB !== null) {
                const botExists = await network.checkBotObjectExistenceInDB(mongoDB, "botIdentifier");

                expect(botExists, "The returned value should be a boolean")
                    .is.a("boolean");
            }
        });

        it("Should return 'false' if there's no bot object with this ID", async () => {
            if (mongoDB !== null) {
                const botExists = await network.checkBotObjectExistenceInDB(mongoDB, "botIdentifier");

                expect(botExists, "The bot should not exist in the DB")
                    .is.false;
            }
        });

        it("Should return 'true' if there's a bot object with this ID", async () => {
            if (mongoDB !== null) {
                const testBotObject = lodash.cloneDeep(botObject);
                const botName = randomBotName;
                const sandbox = true;

                testBotObject.start.name = botName;
                testBotObject.start.id = getObjectId(sandbox, testBotObject.start.name);
                testBotObject.start.sandbox = sandbox;

                network.sendInitialBotObjectToDB(mongoDB, testBotObject);

                const botExists = await network.checkBotObjectExistenceInDB(mongoDB, testBotObject.start.id);

                expect(botExists, "The bot should exist in the DB")
                    .is.true;
            }
        });

        afterEach(() => {
            if (mongoClient !== null) {
                network.closeDBConnection(mongoClient);
            }
        });
    });

    describe("sendInitialBotObjectToDB()", () => {
        let mongoDB: Db | null;
        let mongoClient: MongoClient | null;


        beforeEach(async () => {
            ({ mongoDB, mongoClient } = await network.connectToDB(false, "tests"));
        });

        it("Should return 'true' if there's a bot object with this ID", async () => {
            if (mongoDB !== null) {
                const testBotObject = lodash.cloneDeep(botObject);
                const botName = randomBotName;
                const sandbox = true;

                testBotObject.start.name = botName;
                testBotObject.start.id = getObjectId(sandbox, testBotObject.start.name);
                testBotObject.start.sandbox = sandbox;

                network.sendInitialBotObjectToDB(mongoDB, testBotObject);

                const botExists = await network.checkBotObjectExistenceInDB(mongoDB, testBotObject.start.id);

                expect(botExists, "The bot should exist in the DB")
                    .is.true;
            }
        });

        afterEach(() => {
            if (mongoClient !== null) {
                network.closeDBConnection(mongoClient);
            }
        });
    });

    describe("getBotObjectFromDB()", () => {
        let mongoDB: Db | null;
        let mongoClient: MongoClient | null;


        beforeEach(async () => {
            ({ mongoDB, mongoClient } = await network.connectToDB(false, "tests"));
        });

        it("Should return the bot object", async () => {
            if (mongoDB !== null) {
                const testBotObject = lodash.cloneDeep(botObject);
                const botName = generateRandomBotName();
                const sandbox = true;

                testBotObject.start.name = botName;
                testBotObject.start.id = getObjectId(sandbox, testBotObject.start.name);
                testBotObject.start.sandbox = sandbox;

                const Get = await network.getBotObjectFromDB(mongoDB, testBotObject);
                if (Get !== null) {
                    expect(Get, "The bot object should be returned")
                        .is.equal(testBotObject);
                }

                afterEach(() => {
                    // Close the DB connection
                    if (mongoClient !== null) {
                        network.closeDBConnection(mongoClient);
                    }
                });
            }
        });
    });

    describe("sendOrGetInitialBotObject()", () => {
        let mongoDB: Db | null;
        let mongoClient: MongoClient | null;


        beforeEach(async () => {
            ({ mongoDB, mongoClient } = await network.connectToDB(false, "tests"));
        });

        it("Should return the same bot object", async () => {
            if (mongoDB !== null) {
                const testBotObject = lodash.cloneDeep(botObject);
                const botName = randomBotName;
                const sandbox = true;
                const IQB = generateRandomNumber(1000, 10000);

                testBotObject.start.name = botName;
                testBotObject.start.id = getObjectId(sandbox, testBotObject.start.name);
                testBotObject.start.sandbox = sandbox;
                testBotObject.start.initialQuoteBalance = IQB;

                const sendOrGet = await network.sendOrGetInitialBotObject(mongoDB, testBotObject);

                expect(sendOrGet.start.initialQuoteBalance,"The bot should exist in the DB")
                    .is.greaterThan(0);
            }

        });

        it("Should return a new bot object", async () => {
            if (mongoDB !== null) {
                const testBotObject = lodash.cloneDeep(botObject);
                const botName = randomBotName;
                const sandbox = true;

                testBotObject.start.name = botName;
                testBotObject.start.id = getObjectId(sandbox, testBotObject.start.name);
                testBotObject.start.sandbox = sandbox;

                const sendOrGet = network.sendOrGetInitialBotObject(mongoDB, testBotObject);

                expect((await sendOrGet).start.initialQuoteBalance,"The bot should not exist in the DB")
                    .is.equal(0);
            }

            afterEach(() => {
                // Close the DB connection
                if (mongoClient !== null) {
                    network.closeDBConnection(mongoClient);
                }
            });
        });
    });
});