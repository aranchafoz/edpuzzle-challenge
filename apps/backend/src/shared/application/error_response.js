const _ = require("lodash");
const { ProgrammerError } = require("shared/domain/errors/errors");

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

function convert(error) {
  if (!error) return;

  let parsedError = error;
  if (!error.isDomainError) parsedError = new ProgrammerError({ err: error });

  return parsedError.format();
}

function convertMany(errors) {
  return _.compact(errors.map((err) => convert(err)));
}
