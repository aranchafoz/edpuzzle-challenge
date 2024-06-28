const { AggregateRoot } = require("shared/domain/aggregate/aggregate_root");

/* ====================================================== */
/*                     Domain Errors                      */
/* ====================================================== */

/* ====================================================== */
/*                        Events                          */
/* ====================================================== */

/* ====================================================== */
/*                    Value Objects                       */
/* ====================================================== */

const { Id } = require("shared/domain/value_objects/id");
const { QuestionText } = require("question/domain/value_objects/question_text");

/* ====================================================== */
/*                    Implementation                      */
/* ====================================================== */

class Question extends AggregateRoot {
  constructor({ id, text }, opts) {
    super({ id, text }, opts);
  }

  // Named constructors
  // ------------------

  static random({ id = Id.random(), text = QuestionText.random() } = {}, opts) {
    return new this({ id, text }, opts);
  }

  // Constructors
  // ------------

  // Getters
  // -------

  getId() {
    return this._attributes.id;
  }
  getText() {
    return this._attributes.text;
  }

  // Methods
  // -------
}

/* ====================================================== */
/*                      Public API                        */
/* ====================================================== */

module.exports = { Question };
