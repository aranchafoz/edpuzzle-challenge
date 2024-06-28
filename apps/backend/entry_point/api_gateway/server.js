const express = require("express");
const path = require("path");
const assert = require("assert");
const expressPinoLogger = require("express-pino-logger");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const env = require("shared/infrastructure/env");
const uuid = require("shared/infrastructure/uuid");

/* ====================================================== */
/*                      Middleware                        */
/* ====================================================== */

const { handleError } = require("./middleware/error_middleware");

/* ====================================================== */
/*                        Routes                          */
/* ====================================================== */

const { Api } = require("./api");
const health = require("./health");

/* ====================================================== */
/*                     Implementation                     */
/* ====================================================== */

class Server {
  constructor() {
    this.app = express();
  }

  async start({ commandBus, queryBus, eventBus, logger, geolocationService }) {
    assert(queryBus, "Missing queryBus dependency");
    assert(commandBus, "Missing commandBus dependency");
    assert(eventBus, "Missing eventBus dependency");
    assert(geolocationService, "Missing geolocationService dependency");

    this.app.set("port", this.port);
    this.app.use(helmet());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(cookieParser());
    this.app.use(express.static(path.join(__dirname, "./public")));

    if (!env.isProduction) {
      this.app.use(cors());
    }

    const router = express.Router();

    // Dependency Injection
    // --------------------

    router.use((req, res, next) => {
      req.geolocationService = geolocationService;
      return next();
    });

    // Logging
    // -------

    router.use((req, res, next) => {
      req.id = uuid.v4();
      res.append("Request-Id", req.id);
      return next();
    });

    if (!env.isTesting) {
      router.use(
        expressPinoLogger({ logger: logger.logger, genReqId: (req) => req.id })
      );
    }

    // API
    // -----

    router.use(Api.start({ commandBus, queryBus, eventBus }));
    router.use("/health", health);

    // Error Handling
    // --------------

    router.use(handleError({ logger, env }));

    this.app.use(router);

    await this.app.listen(env.PORT, () => {
      logger.info(`HTTP server started at port ${env.PORT}!`);
    });

    return { app: this.app };
  }

  stop() {
    if (env.isTesting) return;
  }
}

/* ====================================================== */
/*                      Public API                        */
/* ====================================================== */

module.exports = { Server };
