const _ = require("lodash");
const uuid = require("shared/infrastructure/uuid");

/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

const loggingBusMiddleware =
  ({ moduleName, handlerName, logger }) =>
  (next) =>
  async (action, args) => {
    const startTime = Date.now();
    const { correlationId, causationId, ...actionMeta } = action.format().meta;
    const actionData = { ...action.format(), meta: actionMeta };
    const meta = {
      correlationId,
      causationId,
      moduleName,
      handlerName,
    };

    // 1. Log action start
    // -------------------

    logger.info({
      id: uuid.v4(),
      name: `START ${action.getType()}`,
      trace: action.getType(),
      type: "START",
      level: "info",
      occurredOn: startTime,
      attributes: actionData,
      meta,
    });

    // 2. Execute action
    // -----------------

    const { data, error } = await next(action, args);

    // 3. Log action success or error response
    // ---------------------------------------

    const endTime = Date.now();
    const level = error ? error.level : "info";
    const type = error ? "ERROR" : "SUCCESS";

    logger[level]({
      id: uuid.v4(),
      name: `${type} ${action.getType()}`,
      trace: action.getType(),
      type,
      level,
      occurredOn: endTime,
      attributes: { data, error },
      meta: {
        ...meta,
        action: actionData,
        performance: { duration: endTime - startTime, startTime, endTime },
      },
    });

    // 4. Respond
    // ----------

    if (error) {
      return { data, error: { ...error, meta: { ...error.meta, ...meta } } };
    }
    return { data, error };
  };

/* ====================================================== */
/*                      Public API                        */
/* ====================================================== */

module.exports = { loggingBusMiddleware };
