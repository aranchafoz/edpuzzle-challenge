const { errorBusMiddleware } = require("./error_bus_middleware");
const { loggingBusMiddleware } = require("./logging_bus_middleware");

/* ====================================================== */
/*                    Implementation                      */
/* ====================================================== */

function applyMiddleware(fn, middlewares) {
  let fnWithMiddleware = fn;
  middlewares
    .slice()
    .reverse()
    .forEach((middleware) => {
      fnWithMiddleware = middleware(fnWithMiddleware);
    });
  return fnWithMiddleware;
}

/* ====================================================== */
/*                      Public API                        */
/* ====================================================== */

module.exports = {
  applyMiddleware,
  errorBusMiddleware,
  loggingBusMiddleware,
};
