const ErrorResponse = require("shared/application/error_response");

/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

const errorBusMiddleware = () => (next) => async (action, args) => {
  try {
    const { data, error } = await next(action, args);
    return { data, error };
  } catch (err) {
    return {
      data: undefined,
      error: ErrorResponse.convert(err),
    };
  }
};

/* ====================================================== */
/*                      Public API                        */
/* ====================================================== */

module.exports = { errorBusMiddleware };
