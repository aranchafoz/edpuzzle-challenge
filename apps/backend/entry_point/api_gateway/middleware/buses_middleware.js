/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

function injectBusesInRequest({ queryBus, commandBus, eventBus }) {
  return (req, res, next) => {
    const url = `${req.method} ${req.originalUrl}`;

    req.commandBus = {
      handle: (command) => {
        command.addMetadata({
          url,
          hostname: req.hostname,
          correlationId: req.id,
          causationId: req.id,
        });
        return commandBus.handle(command);
      },
    };
    req.queryBus = {
      handle: (query) => {
        query.addMetadata({
          url,
          hostname: req.hostname,
          correlationId: req.id,
          causationId: req.id,
        });
        return queryBus.handle(query);
      },
    };
    return next();
  };
}

/* ====================================================== */
/*                      Public API                        */
/* ====================================================== */

module.exports = {
  injectBusesInRequest,
};
