const _ = require("lodash");
const uuid = require("shared/infrastructure/uuid");
const { ERROR_TYPES } = require("shared/domain/errors/errors");

/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

const HTTP_STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  PARTIAL_CONTENT: 206,

  // Errors
  // ------

  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
};

const HTTP_STATUS_CODE_NAMES = {
  [HTTP_STATUS_CODES.BAD_REQUEST]: "Bad request",
  [HTTP_STATUS_CODES.UNAUTHORIZED]: "Unauthorized",
  [HTTP_STATUS_CODES.PAYMENT_REQUIRED]: "Payment required",
  [HTTP_STATUS_CODES.FORBIDDEN]: "Forbidden",
  [HTTP_STATUS_CODES.NOT_FOUND]: "Not found",
  [HTTP_STATUS_CODES.METHOD_NOT_ALLOWED]: "Method not allowed",
  [HTTP_STATUS_CODES.NOT_ACCEPTABLE]: "Not acceptable",
  [HTTP_STATUS_CODES.REQUEST_TIMEOUT]: "Request timeout",
  [HTTP_STATUS_CODES.CONFLICT]: "Conflict",
  [HTTP_STATUS_CODES.GONE]: "Gone",
  [HTTP_STATUS_CODES.TOO_MANY_REQUESTS]: "Too many requests",
  [HTTP_STATUS_CODES.NOT_IMPLEMENTED]: "Not implemented",
  [HTTP_STATUS_CODES.BAD_GATEWAY]: "Bad gateway",
  [HTTP_STATUS_CODES.SERVICE_UNAVAILABLE]: "Service unavailable",
  [HTTP_STATUS_CODES.GATEWAY_TIMEOUT]: "Gateway timeout",
  [HTTP_STATUS_CODES.INTERNAL_SERVER]: "Internal server error",
};

const HTTP_ERROR_TYPES = {
  API_ERROR: "api-error",
};

class HttpError extends Error {
  constructor({
    id,
    status,
    cause,
    message = "",
    code = "",
    stack,
    data = {},
    meta = {},
  }) {
    const parsedMessage =
      message ||
      HTTP_STATUS_CODE_NAMES[status] ||
      HTTP_STATUS_CODE_NAMES[HTTP_STATUS_CODES.INTERNAL_SERVER];

    if (!code) throw new Error("HttpError must have an code");

    super();

    this.id = id;
    this.status = status;
    this.cause = cause;
    this.message = parsedMessage;
    this.code = code;
    this.data = data;
    this.meta = meta;
    this.isHttpError = true;
    this.stack = stack;

    if (!this.stack) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  format({ isSafeErrorToExposeToClients = false } = {}) {
    let error = {
      id: this.id,
      type: HTTP_ERROR_TYPES.API_ERROR,
      status: this.status,
      message: this.message,
      code: this.code,
      stack: this.stack,
      data: this.data,
      meta: this.meta,
      cause: this.cause,
    };

    if (!isSafeErrorToExposeToClients) {
      error = _.omit(error, ["cause", "stack"]);
    }

    return error;
  }
}

function fromError(
  err,
  {
    status = HTTP_STATUS_CODES.INTERNAL_SERVER,
    code = "internal-server-error",
    message = "Internal server error",
    data = {},
    meta = {},
  } = {}
) {
  // TODO: ?? add `param` attribute in case the error is due to a specific value sent to the API (like Stripe)

  const isSafeErrorToExposeToClients =
    err.isDomainError &&
    _.includes(
      [
        ERROR_TYPES.VALUE_OBJECT,
        ERROR_TYPES.ENTITY,
        ERROR_TYPES.OPERATIONAL,
        ERROR_TYPES.AUTHORIZATION,
      ],
      err.type
    );

  return new HttpError({
    id: uuid.v4(),
    message: isSafeErrorToExposeToClients ? "Internal server error" : message,
    cause: err,
    code: isSafeErrorToExposeToClients ? code : "internal-server-error",
    status: isSafeErrorToExposeToClients
      ? status
      : HTTP_STATUS_CODES.INTERNAL_SERVER,
    data,
    meta,
  });
}

function create({
  status = HTTP_STATUS_CODES.INTERNAL_SERVER,
  code = "internal-server-error",
  message = "Internal server error",
  data = {},
  meta = {},
}) {
  return new HttpError({
    id: uuid.v4(),
    status,
    message,
    code,
    data,
    meta,
  });
}

/* ====================================================== */
/*                      Public API                        */
/* ====================================================== */

module.exports = {
  HTTP_STATUS_CODES,
  httpResponse: {
    fromError,
    create,
  },
};
