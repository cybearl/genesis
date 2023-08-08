import { Db, MongoClient, ObjectId } from "mongodb";

import { NETWORK_CONFIG } from "configs/global.config";
import { getCurrentDateString } from "helpers/local/IO";
import NsBotObject from "types/botObject";
import logger from "utils/logger";


/**
 * Connect to MongoDB.
 * @param fatal If the connection fails, should the application exit? (default: true)
 * @returns The MongoDB database.
 */
export async function connectToDB(fatal = true, databaseName = process.env.MONGODB_DB) {
    const uri = `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_HOST}/?authMechanism=SCRAM-SHA-256&tls=true`;
    const mongoClient = new MongoClient(uri, {});

    try {
        await mongoClient.connect();

        const listOfDatabases = await mongoClient.db().admin().listDatabases();

        // Verify if the database exist inside the MongoDB cluster
        if (listOfDatabases.databases.some((database) => database.name === databaseName)) {
            logger.verbose(`Database [${databaseName}] found.`);
        } else {
            logger.error(`Database [${databaseName}] not found.`);

            if (fatal) {
                process.exit(1);
            } else {
                return {
                    mongoClient: null,
                    mongoDB: null
                };
            }
        }

        const mongoDB = mongoClient.db(databaseName);

        logger.info(`Successfully connected to the MongoDB database [${databaseName}].`);

        return {
            mongoClient: mongoClient,
            mongoDB: mongoDB
        };
    } catch (error) {
        logger.error(`Error while connecting to the MongoDB database:\n${error}.`);

        if (fatal) {
            process.exit(1);
        } else {
            return {
                mongoClient: null,
                mongoDB: null
            };
        }
    }
}

/**
 * Close the MongoDB connection.
 * @param mongoClient The MongoDB client.
 */
export async function closeDBConnection(mongoClient: MongoClient) {
    try {
        if (mongoClient !== null) {
            await mongoClient.close();
        }

        logger.verbose("Successfully closed the database connection.");
    } catch (error) {
        logger.error(`Error while closing the database connection:\n${error}.`);
    }
}

/**
 * Check if the bot object already exists in the database.
 * @param mongoDB The MongoDB database.
 * @param botIdentifier The bot object identifier (objectID from MongoDB).
 * @returns If the bot object exist.
 */
export async function checkBotObjectExistenceInDB(mongoDB: Db, botIdentifier: string) {
    try {
        const result = await mongoDB.collection(NETWORK_CONFIG.botObjectsCollection).findOne({
            _id: ObjectId.createFromHexString(botIdentifier)
        });

        if (result) {
            logger.verbose("Object for this bot found inside the database.");

            return true;
        } else {
            logger.verbose("Object for this bot do not exist inside the database.");

            return false;
        }
    } catch (error) {
        logger.error(`Error while checking the object existence inside the database:\n${error}.`);
        return false;
    }
}

/**
 * Send the initial bot object to the database.
 * @param mongoDB The MongoDB database.
 * @param botObject The bot object.
 */
export async function sendInitialBotObjectToDB(mongoDB: Db, botObject: NsBotObject.IsBotObject) {
    try {
        // Handle init time special
        botObject.specials.initTime = getCurrentDateString();

        await mongoDB.collection(NETWORK_CONFIG.botObjectsCollection).insertOne({
            _id: ObjectId.createFromHexString(botObject.start.id),
            start: botObject.start,
            stop: botObject.stop,
            shared: botObject.shared,
            specials: botObject.specials,
        });

        logger.verbose("Initial bot object successfully sent to the database.");
    } catch (error) {
        logger.error(`Error while sending initial bot object to the database:\n${error}.`);
    }
}

/**
 * Get the bot object from the database.
 * Note that it also recovers the specials object.
 * @param mongoDB The MongoDB database.
 * @param botObject The bot object.
 * @returns The bot object with shared vars recovered from database.
 */
export async function getBotObjectFromDB(
    mongoDB: Db,
    botObject: NsBotObject.IsBotObject
): Promise<NsBotObject.IsBotObject | null> {
    try {
        const res = await mongoDB.collection(NETWORK_CONFIG.botObjectsCollection).findOne({
            _id: ObjectId.createFromHexString(botObject.start.id)
        });

        if (res) {
            logger.verbose("Bot object successfully retrieved from the database.");

            // Get the shared object (and specials object)
            botObject.shared = res.shared as NsBotObject.IsBotObjectShared;
            botObject.specials = res.specials as NsBotObject.IsBotObjectSpecials;

            return botObject;
        } else {
            logger.error("Error while retrieving bot object from the database.");
            return null;
        }
    } catch (error) {
        logger.error(`Error while retrieving bot object from the database:\n${error}.`);
        return null;
    }
}

/**
 * Send or get the bot object to/from the database.
 * @param mongoDB The MongoDB database.
 * @param botObject The bot object.
 * @returns Either the DB object or the unmodified passed bot object.
 */
export async function sendOrGetInitialBotObject(mongoDB: Db, botObject: NsBotObject.IsBotObject) {
    // Check if the bot object already exists in the database
    const existence = await checkBotObjectExistenceInDB(mongoDB, botObject.start.id);

    if (existence) {
        // Get the bot object from the database
        const res = await getBotObjectFromDB(mongoDB, botObject);

        if (res) {
            return res;
        } else {
            // Return the unmodified bot object in case of error
            return botObject;
        }
    } else {
        // Send the initial bot object to the database
        await sendInitialBotObjectToDB(mongoDB, botObject);

        // Return the unmodified bot object
        return botObject;
    }
}

/**
 * Updates different categories of the bot object (start, stop or shared).
 * Note that it also updates the specials category.
 *
 * @param mongoDB The MongoDB database.
 * @param botObject The bot object.
 */
export async function sendBotObjectCategory(
    mongoDB: Db,
    botObject: NsBotObject.IsBotObject,
    category: "start" | "stop" | "shared"
) {
    try {
        // Handle last shared update special
        botObject.specials.lastSharedUpdate = getCurrentDateString();

        await mongoDB.collection(NETWORK_CONFIG.botObjectsCollection).updateOne(
            {
                _id: ObjectId.createFromHexString(botObject.start.id)
            },
            {
                $set: {
                    [category]: botObject[category],
                    specials: botObject.specials
                }
            }
        );

        logger.verbose(`Bot object '${category}' category successfully sent to the database.`);
    } catch (error) {
        logger.error(`Error while sending bot object '${category}' category to the database:\n${error}.`);
    }
}