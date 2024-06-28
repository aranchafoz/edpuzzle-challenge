const {
  ValueObject,
  ValueObjectError,
} = require("shared/domain/value_objects/value_object");
const Base64URL = require("base64-url");
const uuid = require("shared/infrastructure/uuid");

/* ====================================================== */
/*                       Exceptions                       */
/* ====================================================== */

class InvalidCursorError extends ValueObjectError {}

/* ====================================================== */
/*                    Implementation                      */
/* ====================================================== */

class Cursor extends ValueObject {
  constructor(value = "") {
    super(value);
  }
  isEmpty() {
    return this._value === "";
  }
  static encode(value) {
    return new this(Base64URL.encode(value));
  }
  static empty() {
    return new this();
  }
  static random() {
    return new this(Base64URL.encode(uuid.mongoId()));
  }
  decode() {
    return Base64URL.decode(this._value);
  }
  isEncoded(value) {
    return Base64URL.decode(this._value) === value;
  }
}

/* ====================================================== */
/*                      Public API                        */
/* ====================================================== */

module.exports = { Cursor, InvalidCursorError };
