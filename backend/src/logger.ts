import {
  format,
  transports,
  createLogger,
} from 'winston';

const logger = createLogger({
  level: 'info',

  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.colorize({
      // all: true,
      colors: { info: 'blue', warn: 'green', error: 'red' }
    }),
    format.printf(({ timestamp, level, message }) => {
      return `[${level}] ${timestamp}: ${message}`;
    })
  ),

  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/output.log' }),
  ],
});

export default logger;
