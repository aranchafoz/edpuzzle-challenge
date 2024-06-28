const _ = require("lodash");
const {
  ValueObject,
  ValueObjectError,
} = require("shared/domain/value_objects/value_object");

class InvalidCounterError extends ValueObjectError {}

class Counter extends ValueObject {
  constructor(value = null) {
    if (!_.isFinite(value) || value < 0) {
      throw new InvalidCounterError({ data: value });
    }
    super(value);
  }

  static random({ min = 0, max = Number.MAX_VALUE } = {}) {
    return new this(_.random(min, max));
  }

  static zero() {
    return new this(0);
  }

  isZero() {
    return this._value === 0;
  }
}

module.exports = { Counter, InvalidCounterError };
