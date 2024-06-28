const { v4: uuidv4 } = require("uuid");
const { ObjectId } = require("mongodb");

/* ====================================================== */
/*                      Public API                        */
/* ====================================================== */

module.exports = {
  v4,
  mongoId,
  custom,
};

/* ====================================================== */
/*                    Implementation                      */
/* ====================================================== */

function v4() {
  return uuidv4();
}

function custom({ length = 16, alphabet = urlAlphabet }) {
  return customAlphabet(alphabet, length)();
}

function mongoId() {
  return new ObjectId();
}
