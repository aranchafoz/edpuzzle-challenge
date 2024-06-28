const env = require("shared/infrastructure/env");
const _ = require("lodash");
const pino = require("pino");

/* ====================================================== */
/*                    Implementation                      */
/* ====================================================== */

const LOGGER_SOURCES = {
  API_GATEWAY: "api_gateway",
  APPLICATION: "application",
  MONGO_DB: "mongo_db",
};

class Logger {
  constructor({ name = "", enabled = true, level = "info" } = {}) {
    if (!name || !_.includes(_.values(LOGGER_SOURCES), name)) {
      throw new Error(`Invalid Logger source: ${name}`);
    }
    this.logger = pino({
      name,
      enabled,
      level,
      transport: { target: "pino-pretty", options: { colorize: true } },
    });
  }

  // Named constructors
  // ------------------

  static apiGateway() {
    return new this({
      name: LOGGER_SOURCES.API_GATEWAY,
      enabled: env.logging.apiGateway.enabled,
      level: env.logging.apiGateway.level,
    });
  }

  static application() {
    return new this({
      name: LOGGER_SOURCES.APPLICATION,
      enabled: env.logging.application.enabled,
      level: env.logging.application.level,
    });
  }

  static mongoDb() {
    return new this({
      name: LOGGER_SOURCES.MONGO_DB,
      enabled: env.logging.mongoDb.enabled,
      level: env.logging.mongoDb.level,
    });
  }

  // Methods
  // -------

  debug(message) {
    return this.logger.debug(message);
  }
  info(message) {
    return this.logger.info(message);
  }
  warn(message) {
    return this.logger.warn(message);
  }
  error(message) {
    return this.logger.error(message);
  }
  fatal(message) {
    return this.logger.fatal(message);
  }
}

/* ====================================================== */
/*                      Public API                        */
/* ====================================================== */

module.exports = { Logger };
