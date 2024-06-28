const _ = require("lodash");

/* ====================================================== */
/*                      Public API                        */
/* ====================================================== */

module.exports = {
  convert,
  convertMany,
};

/* ====================================================== */
/*                    Implementation                      */
/* ====================================================== */

function convert(question) {
  if (!question) return;
  return {
    id: question.getId().toValue(),
    text: question.getText().toValue(),
  };
}

function convertMany(questions = []) {
  return _.compact(questions.map(convert));
}
