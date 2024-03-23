import { createLogger, format, transports } from "winston";


const loggerFormat = format.combine(
    format.timestamp({ format: "HH:mm:ss" }),
    format.printf((info) => `[${info.timestamp}] ${info.message}`),
    format.colorize({ all: true })
);

/**
 * Main Winston logger instance.
 */
const logger = createLogger({
    format: loggerFormat,
    transports: [
        new transports.Console({ level: "silly" })
    ]
});


export default logger;