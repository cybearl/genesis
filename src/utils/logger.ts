import { createLogger, format, transports } from "winston";
import Transport from "winston-transport";

import { GENERAL_CONFIG } from "../configs/global.config";

/**
 * Custom logger transport for MongoDB.
 */
class SessionTransport extends Transport {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public logs: any[];

    constructor(opts?: Transport.TransportStreamOptions) {
        super(opts);

        this.logs = [];
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    log(info: any[], callback: () => void) {
        setImmediate(() => {
            this.emit("logged", info);
        });

        // Store the log in the variable
        this.logs.push(info);

        callback();
    }
}

/**
 * Logger format.
 */
const loggerFormat = format.combine(
    format.timestamp({
        format: GENERAL_CONFIG.dateFormat
    }),
    format.printf((info) => {
        return `[${info.timestamp}] [${info.level.toUpperCase()}] ${info.message}`;
    }),
    format.colorize({
        all: true,
    })
);

/**
 * Logger level.
 */
let loggerLevel = "info";
if (GENERAL_CONFIG.verbose) {
    loggerLevel = "silly";
}

/**
 * Winston general formatted logger.
 */
const logger = createLogger({
    format: loggerFormat,
    transports: [
        new SessionTransport({ level: loggerLevel }),
        new transports.Console({ level: loggerLevel })
    ],
});

/**
 * Variable to get the MongoDB Transport logs directly.
 */
export const SessionLogs = (logger.transports[0] as SessionTransport).logs;


export default logger;