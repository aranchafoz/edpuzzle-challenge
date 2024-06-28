const Chance = require("chance");
const _ = require("lodash");
const {
  ValueObject,
  ValueObjectError,
} = require("shared/domain/value_objects/value_object");

/* ====================================================== */
/*                       Exceptions                       */
/* ====================================================== */

class InvalidVideoQuestionTimeError extends ValueObjectError {}

/* ====================================================== */
/*                    Implementation                      */
/* ====================================================== */

class VideoQuestionTime extends ValueObject {
  constructor(value = "") {
    if (!_.isInteger(value) || value < 0) {
      throw new InvalidVideoQuestionTimeError({ data: value });
    }
    super(value);
  }
  static random({ min = 0, max = 10000 } = {}) {
    const chance = new Chance();
    return new this(chance.integer({ min, max }));
  }
}

/* ====================================================== */
/*                      Public API                        */
/* ====================================================== */

module.exports = { VideoQuestionTime, InvalidVideoQuestionTimeError };
