import fs from "fs";
import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

if (!fs.existsSync("logs")) fs.mkdirSync("logs");

const logger = winston.createLogger({
  level: process.env.NODE_ENV === "prod" ? "debug" : "info",

  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.printf(({ timestamp, level, message, stack }) =>
      `${timestamp} ${level.toUpperCase()}: ${stack || message}`
    )
  ),

  transports: [
    new winston.transports.Console(),

    new DailyRotateFile({
      filename: "logs/app-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      maxSize: "10m",
      maxFiles: "14d"
    })
  ],
});

export default logger;
