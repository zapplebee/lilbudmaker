import { createLogger, format, transports } from "winston";
import { join } from "node:path";

export const logger = createLogger({
  level: "debug",
  format: format.json(),

  transports: [
    new transports.File({
      filename: "lilbudz.ndjson",
      format: format.combine(format.json()),
    }),
  ],
});
