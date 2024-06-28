const _ = require("lodash");
const { ValueObjectError } = require("shared/domain/errors/errors");

/* ====================================================== */
/*                    Implementation                      */
/* ====================================================== */

class ValueObject {
  constructor(value) {
    this.isValueObject = true;
    this._value = value;
  }
  static random() {
    throw new Error(".random() method not implemented");
  }
  equals(value) {
    if (_.isObject(value)) {
      return _.isEqual(this._value, value.toValue());
    }
    return this._value === value.toValue();
  }
  toValue() {
    return this._value;
  }
}

/* ====================================================== */
/*                      Public API                        */
/* ====================================================== */

module.exports = { ValueObject, ValueObjectError };
