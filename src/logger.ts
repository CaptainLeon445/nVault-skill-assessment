import winston from "winston";
const { combine, timestamp, json } = winston.format;

const logger = winston.createLogger({
  format: combine(timestamp(), json()),
    transports: [
        new winston.transports.Console,
        new winston.transports.File({ filename: 'logs/error/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/audit/event.log', level: 'info' }),
    ]
})

export default logger;