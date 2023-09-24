import winston from "winston";
const { combine, timestamp, printf, colorize, align } = winston.format;

const logLevels = {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    debug: 4,
    audit: 5,
  };
const logger = winston.createLogger({
    format: combine(
        // colorize({ all: true }),
        timestamp({
          format: 'YYYY-MM-DD hh:mm:ss.SSS A',
        }),
        // align(),
        printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
      ),
    transports: [
        new winston.transports.Console,
        new winston.transports.File({ filename: 'logs/error/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/audit/event.log', level: 'info' }),
    ]
})

export default logger;