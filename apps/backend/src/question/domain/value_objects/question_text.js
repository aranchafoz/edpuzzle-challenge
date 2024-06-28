const Chance = require("chance");
const _ = require("lodash");
const {
  ValueObject,
  ValueObjectError,
} = require("shared/domain/value_objects/value_object");

/* ====================================================== */
/*                       Exceptions                       */
/* ====================================================== */

class InvalidQuestionTextError extends ValueObjectError {}

/* ====================================================== */
/*                    Implementation                      */
/* ====================================================== */

class QuestionText extends ValueObject {
  constructor(value = "") {
    const parsedValue = _.trim(value);
    if (_.isEmpty(parsedValue)) {
      throw new InvalidQuestionTextError({ data: value });
    }
    super(parsedValue);
  }
  static random() {
    const chance = new Chance();
    return new this(chance.sentence());
  }
}

/* ====================================================== */
/*                      Public API                        */
/* ====================================================== */

module.exports = { QuestionText, InvalidQuestionTextError };
