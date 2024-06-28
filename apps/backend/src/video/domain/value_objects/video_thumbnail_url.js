const Chance = require("chance");
const _ = require("lodash");
const {
  ValueObject,
  ValueObjectError,
} = require("shared/domain/value_objects/value_object");

/* ====================================================== */
/*                       Exceptions                       */
/* ====================================================== */

class InvalidVideoThumbnailUrlError extends ValueObjectError {}

/* ====================================================== */
/*                    Implementation                      */
/* ====================================================== */

class VideoThumbnailUrl extends ValueObject {
  constructor(value = "") {
    const parsedValue = _.trim(value);
    if (_.isEmpty(parsedValue)) {
      throw new InvalidVideoThumbnailUrlError({ data: value });
    }
    super(parsedValue);
  }
  static random() {
    const chance = new Chance();
    return new this(chance.word());
  }
}

/* ====================================================== */
/*                      Public API                        */
/* ====================================================== */

module.exports = { VideoThumbnailUrl, InvalidVideoThumbnailUrlError };
