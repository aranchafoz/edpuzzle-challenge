const Chance = require("chance");
const _ = require("lodash");
const {
  ValueObject,
  ValueObjectError,
} = require("shared/domain/value_objects/value_object");

/* ====================================================== */
/*                       Exceptions                       */
/* ====================================================== */

class InvalidVideoFeedbackIsPositiveError extends ValueObjectError {}

/* ====================================================== */
/*                    Implementation                      */
/* ====================================================== */

class VideoFeedbackIsPositive extends ValueObject {
  constructor(value = true) {
    const parsedValue = _.trim(value);
    if (_.isEmpty(parsedValue)) {
      throw new InvalidVideoFeedbackIsPositiveError({ data: value });
    }
    super(parsedValue);
  }
  static random() {
    const chance = new Chance();
    return new this(chance.bool());
  }
}

/* ====================================================== */
/*                      Public API                        */
/* ====================================================== */

module.exports = { VideoFeedbackIsPositive, InvalidVideoFeedbackIsPositiveError };
