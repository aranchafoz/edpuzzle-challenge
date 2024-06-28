const _ = require("lodash");
const {
  ValueObject,
  ValueObjectError,
} = require("shared/domain/value_objects/value_object");

/* ====================================================== */
/*                    Value Objects                       */
/* ====================================================== */

const { VideoQuestion } = require("video/domain/value_objects/video_question");

/* ====================================================== */
/*                       Exceptions                       */
/* ====================================================== */

class InvalidVideoQuestionsError extends ValueObjectError {}

/* ====================================================== */
/*                    Implementation                      */
/* ====================================================== */

class VideoQuestions extends ValueObject {
  constructor(value) {
    if (!_.isArray(value)) {
      throw new InvalidVideoQuestionsError({ data: value });
    }
    const parsedValue = value.map(
      (videoQuestion) => new VideoQuestion(videoQuestion)
    );
    super(parsedValue);
  }

  static empty() {
    return new this([]);
  }

  static random({ quantity = _.random(1, 10) } = {}) {
    if (quantity === 0) return new this([]);

    return new this(_.times(quantity, () => VideoQuestion.random().toValue()));
  }

  isEmpty() {
    return this._value.length === 0;
  }

  toValue() {
    return _.map(this._value, (videoQuestion) => videoQuestion.toValue());
  }
}

/* ====================================================== */
/*                      Public API                        */
/* ====================================================== */

module.exports = { VideoQuestions, InvalidVideoQuestionsError };
