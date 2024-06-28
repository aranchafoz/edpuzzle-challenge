const _ = require("lodash");
const uuid = require("shared/infrastructure/uuid");
const {
  ValueObject,
  ValueObjectError,
} = require("shared/domain/value_objects/value_object");

/* ====================================================== */
/*                       Exceptions                       */
/* ====================================================== */

class InvalidIdError extends ValueObjectError {}

/* ====================================================== */
/*                    Implementation                      */
/* ====================================================== */

class Id extends ValueObject {
  constructor(value = "") {
    if (value.length < 1) {
      throw new InvalidIdError({ data: value });
    }
    super(value);
  }
  static random() {
    return new this(uuid.mongoId());
  }
  static isValid(value) {
    return value.length >= 1;
  }
}

class NullableId extends ValueObject {
  constructor(value = "") {
    if (_.isString(value) && _.isEmpty(value)) {
      return super("");
    }
    const parsedValue = new Id(value);
    return super(parsedValue.toValue());
  }
  static empty() {
    return new this();
  }
  static random() {
    return new this(Id.random().toValue());
  }
  isEmpty() {
    return this._value === "";
  }
}

/* ====================================================== */
/*                       Public API                       */
/* ====================================================== */

module.exports = { Id, NullableId, InvalidIdError };
