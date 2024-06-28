const assert = require("assert");
const express = require("express");

/* ====================================================== */
/*                       Middleware                       */
/* ====================================================== */

const { injectBusesInRequest } = require("../middleware/buses_middleware");

/* ====================================================== */
/*                        Handlers                        */
/* ====================================================== */

const videosRouter = require("./videos");

/* ====================================================== */
/*                    Implementation                      */
/* ====================================================== */

class Api {
  static start({ commandBus, queryBus, eventBus }) {
    assert(queryBus, "Missing queryBus dependency");
    assert(commandBus, "Missing commandBus dependency");
    assert(eventBus, "Missing eventBus dependency");

    const router = express.Router();
    router.use(injectBusesInRequest({ queryBus, commandBus, eventBus }));

    router.use("/api/v1/videos", videosRouter);

    return router;
  }
}

/* ====================================================== */
/*                      Public API                        */
/* ====================================================== */

module.exports = { Api };
