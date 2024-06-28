const _ = require("lodash");
const {
  ValueObject,
  ValueObjectError,
} = require("shared/domain/value_objects/value_object");

/* ====================================================== */
/*                       Exceptions                       */
/* ====================================================== */

class InvalidUTCTimestampError extends ValueObjectError {}

/* ====================================================== */
/*                    Implementation                      */
/* ====================================================== */

class UTCTimestamp extends ValueObject {
  constructor(value = null) {
    // TODO: validate it is in UTC
    super(value);
  }
  static now() {
    return new this(Date.now());
  }
  static never() {
    return new this(null);
  }
  static random() {
    return new this(Date.now());
  }
  isDate() {
    return !_.isNull(this.toValue());
  }
  toObject() {
    const mDate = moment.utc(this.toValue(), "YYYY-MM-DD hh:mm:ss.SSSZ");
    return {
      year: mDate.year(),
      month: mDate.month() + 1,
      day: mDate.date(),
      dayOfWeek: mDate.day() + 1,
      hour: mDate.hour(),
      minute: mDate.minutes(),
      second: mDate.seconds(),
      millisecond: mDate.milliseconds(),
    };
  }
}

/* ====================================================== */
/*                      Public API                        */
/* ====================================================== */

module.exports = { UTCTimestamp };
