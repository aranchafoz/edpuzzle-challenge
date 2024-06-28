const { httpResponse, HTTP_STATUS_CODES } = require("../http_response");

/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

function handleError({ logger, env }) {
  return (err, req, res, next) => {
    const errResponse = formatError(err, { req, logger, env });

    if (res.headersSent) return;

    return res.status(errResponse.status).json({ error: errResponse });
  };
}

/* ====================================================== */
/*                      Public API                        */
/* ====================================================== */

module.exports = {
  handleError,
  formatError,
};

/* ====================================================== */
/*                        Helpers                         */
/* ====================================================== */

function formatError(err, { req, logger, env }) {
  const error = err.isHttpError ? err : httpResponse.fromError(err);
  const errResponse = error.format({
    isSafeErrorToExposeToClients: env.isDevelopment,
  });

  if (
    (env.isDevelopment && error.status >= HTTP_STATUS_CODES.BAD_REQUEST) ||
    error.status >= HTTP_STATUS_CODES.TOO_MANY_REQUESTS
  ) {
    logger.error(errResponse);
  }

  return {
    ...errResponse,
    meta: {
      ...errResponse.meta,
      requestId: req.id,
      url: `${req.method} ${req.originalUrl}`,
      hostname: req.hostname,
    },
  };
}
