import winston from "winston";
const { combine, timestamp, json, colorize, align, printf } = winston.format;

const consoleLogFormat = combine(
  colorize(),
  printf(({ level, message, timestamp }) => {
    return `[${timestamp}] ${level}: ${message}`;
  })
);

// creating the logger
const logger = winston.createLogger({
  level: "info",
  format: combine(timestamp(), align(), colorize({ all: true }), json()),
  transports: [
    new winston.transports.Console({ format: consoleLogFormat }),
    new winston.transports.File({ filename: "app.log" }),
  ],
});

export default logger;
