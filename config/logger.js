const { createLogger, format, transports } = require('winston');
const { combine } = format;

const colorizer = format.colorize();

const logger = createLogger({
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        debug: 4,
        silly: 6
    },
    format: combine(
        format.timestamp(),
        format.simple(),
        format.printf(msg =>
            colorizer.colorize(msg.level, `${msg.timestamp} - ${msg.level}: ${msg.message}`)
        )
    ),
    transports: [
        new (transports.Console)({
            // format: winston.format.combine(winston.format.colorize(), alignColorsAndTime),
            prettyPrint: true,
            colorize: true,
            timestamp: true,

        }),
    ],
    level: 'silly'
});
module.exports = logger;