const _ = require("lodash");
const {
  ValueObject,
  ValueObjectError,
} = require("shared/domain/value_objects/value_object");

/* ====================================================== */
/*                    Value Objects                       */
/* ====================================================== */

const { Id } = require("shared/domain/value_objects/id");
const { VideoQuestionTime } = require("./video_question_time");

/* ====================================================== */
/*                       Exceptions                       */
/* ====================================================== */

class InvalidVideoQuestionError extends ValueObjectError {}

/* ====================================================== */
/*                    Implementation                      */
/* ====================================================== */

class VideoQuestion extends ValueObject {
  constructor({ time, questionId }) {
    super({
      time: new VideoQuestionTime(time),
      questionId: new Id(questionId),
    });
  }
  static random({ time, questionId } = {}) {
    return new this({
      time: time || VideoQuestionTime.random().toValue(),
      questionId: questionId || Id.random().toValue(),
    });
  }
  toValue() {
    return {
      time: this._value.time.toValue(),
      questionId: this._value.questionId.toValue(),
    };
  }
}

/* ====================================================== */
/*                      Public API                        */
/* ====================================================== */

module.exports = { VideoQuestion, InvalidVideoQuestionError };
