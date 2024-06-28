const _ = require("lodash");
const Chance = require("chance");
const {
  ValueObject,
  ValueObjectError,
} = require("shared/domain/value_objects/value_object");

/* ====================================================== */
/*                       Exceptions                       */
/* ====================================================== */

class InvalidPageSizeError extends ValueObjectError {}

/* ====================================================== */
/*                    Implementation                      */
/* ====================================================== */

const DEFAULT_MIN = 1;
const DEFAULT_MAX = 20;

class PageSize extends ValueObject {
  constructor(value, { min = DEFAULT_MIN, max = DEFAULT_MAX } = {}) {
    if (!_.isInteger(value) || value < min || value > max) {
      throw new InvalidPageSizeError({ data: { pageSize: value, min, max } });
    }
    super(value);
  }
  static random({ min = DEFAULT_MIN, max = DEFAULT_MAX } = {}) {
    const chance = new Chance();
    return new this(chance.natural({ min, max }));
  }
}

/* ====================================================== */
/*                      Public API                        */
/* ====================================================== */

module.exports = { PageSize, InvalidPageSizeError };
