const uuid = require("shared/infrastructure/uuid");

/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

const ERROR_TYPES = {
  VALUE_OBJECT: "value-object-error",
  ENTITY: "entity-error",
  OPERATIONAL: "operational-error",
  AUTHORIZATION: "authorization-error",
  PROGRAMMER: "programmer-error",
  INFRASTRUCTURE: "infrastructure-error",
  DATA_MAPPING: "data-mapping-error",
  SECURITY: "security-error",
};

const ERROR_LEVELS = {
  SILENT: "silent",
  TRACE: "trace",
  DEBUG: "debug",
  INFO: "info",
  WARN: "warn",
  ERROR: "error",
  FATAL: "fatal",
};

class DomainError extends Error {
  constructor({
    id,
    type,
    name,
    level,
    occurredOn = Date.now(),
    data = {},
    meta = {},
    stack,
  } = {}) {
    super();

    this.id = id || uuid.v4();
    this.name = name || this.constructor.name;
    this.type = type;
    this.level = level;
    this.occurredOn = occurredOn;
    this.data = data;
    this.meta = meta;
    this.isDomainError = true;
    this.stack = stack;

    if (!this.stack) {
      if (data instanceof Error) {
        this.stack = data.stack;
      } else {
        Error.captureStackTrace(this, this.constructor);
      }
    }
  }
  format() {
    return {
      id: this.getId(),
      type: this.getType(),
      name: this.getName(),
      level: this.getLevel(),
      occurredOn: this.getOccurredOn(),
      attributes: this.getAttributes(),
      meta: this.getMetadata(),
      stack: this.getStack(),
    };
  }
  toString() {
    try {
      return JSON.stringify(this.format());
    } catch (err) {
      return "";
    }
  }
  getId() {
    return this.id;
  }
  getType() {
    return this.type;
  }
  getName() {
    return this.name;
  }
  getLevel() {
    return this.level;
  }
  getOccurredOn() {
    return this.occurredOn;
  }
  getAttributes() {
    return this.data;
  }
  getStack() {
    return this.stack;
  }
  getMetadata() {
    return this.meta;
  }
  addMetadata(data) {
    this.meta = {
      ...this.meta,
      ...data,
    };
  }
}

class OperationalError extends DomainError {
  constructor({ level = ERROR_LEVELS.INFO, data = {} } = {}) {
    super({ type: ERROR_TYPES.OPERATIONAL, level, data });
  }
}

class ValueObjectError extends DomainError {
  constructor({ level = ERROR_LEVELS.WARN, data }) {
    super({ type: ERROR_TYPES.VALUE_OBJECT, level, data });
  }
}

class AggregateError extends DomainError {
  constructor({ level = ERROR_LEVELS.WARN, data }) {
    super({ type: ERROR_TYPES.ENTITY, level, data });
  }
}

class AuthorizationError extends DomainError {
  constructor({ level = ERROR_LEVELS.INFO, data = {} } = {}) {
    super({ type: ERROR_TYPES.AUTHORIZATION, level, data });
  }
}

class SecurityError extends DomainError {
  constructor({ level = ERROR_LEVELS.FATAL, data }) {
    super({ type: ERROR_TYPES.SECURITY, level, data });
  }
}
class ProgrammerError extends DomainError {
  constructor({ level = ERROR_LEVELS.FATAL, err, data = {} }) {
    super({
      type: ERROR_TYPES.PROGRAMMER,
      name: err.name,
      level,
      data: { err, data },
      stack: err.stack,
    });
  }
}

class DataMappingError extends DomainError {
  constructor({ level = ERROR_LEVELS.FATAL, err }) {
    if (!err.isDomainError) {
      return new ProgrammerError({ level, err });
    }
    super({
      id: err.getId(),
      type: ERROR_TYPES.DATA_MAPPING,
      name: err.getName(),
      level,
      occurredOn: err.getOccurredOn(),
      data: err.getAttributes(),
      stack: err.getStack(),
    });
  }
}

class InfrastructureError extends DomainError {
  constructor({ level = ERROR_LEVELS.FATAL, err, data }) {
    if (!err.isDomainError) {
      return new ProgrammerError({ err });
    }
    super({
      id: err.getId(),
      type: ERROR_TYPES.INFRASTRUCTURE,
      name: err.getName(),
      level,
      occurredOn: err.getOccurredOn(),
      data: { err: err.format(), data },
      stack: err.getStack(),
    });
  }
}

/* ====================================================== */
/*                      Public API                        */
/* ====================================================== */

module.exports = {
  ERROR_TYPES,
  ERROR_LEVELS,
  OperationalError,
  ValueObjectError,
  AggregateError,
  AuthorizationError,
  ProgrammerError,
  DataMappingError,
  InfrastructureError,
  SecurityError,
};
