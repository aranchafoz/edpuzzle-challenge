const env = require("shared/infrastructure/env");
const uuid = require("shared/infrastructure/uuid");
const containerFactory = require("shared/container_factory");

/* ====================================================== */
/*                     Infrastructure                     */
/* ====================================================== */

const {
  GeolocationService,
} = require("./services/geolocation/geolocation_service");
const { Logger } = require("shared/infrastructure/logger/logger");
const { DatabaseClient } = require("shared/infrastructure/mongodb/db");
const { Server } = require("./server");

/* ====================================================== */
/*                        Modules                         */
/* ====================================================== */

const { modules } = require("../../src");

/* ====================================================== */
/*                    Implementation                      */
/* ====================================================== */

class Application {
  constructor() {
    this.server = new Server();
    this.geolocationService = new GeolocationService({
      env,
      secretKey: "",
      userAgent: "",
      cache: {},
    });
    this.databaseClient = new DatabaseClient({
      url: env.mongo.url,
      logger: Logger.mongoDb(),
    });
    this.applicationLogger = Logger.application();
    this.apiGateway = Logger.apiGateway();
  }

  async start() {
    try {
      const { client } = await this.databaseClient.connect();
      const mongoConnection = client.db(env.mongo.databaseName);

      const { commandBus, queryBus, eventBus, resolve, register, unregister } =
        containerFactory.createContainer({
          modules,
          dependencies: {
            env,
            mongoConnection,
            logger: this.applicationLogger,
          },
        });

      const { app } = await this.server.start({
        commandBus,
        queryBus,
        eventBus,
        logger: this.apiGateway,
        geolocationService: this.geolocationService,
      });
      this.apiGateway.info("Application Started!");
      return {
        app,
        commandBus,
        queryBus,
        eventBus,
        resolve,
        register,
        unregister,
        logger: this.apiGateway,
      };
    } catch (err) {
      this.apiGateway.fatal("Application Failed to start!", err);
      throw err;
    }
  }

  async stop() {
    this.server.stop();
    if (env.isTesting) {
      await this.databaseClient.drop();
      await this.databaseClient.disconnect();
    } else {
      await this.databaseClient.disconnect();
    }
  }
}

/* ====================================================== */
/*                      Public API                        */
/* ====================================================== */

module.exports = Application;
