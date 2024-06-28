const { InfrastructureError } = require("shared/domain/errors/errors");

/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

class MongoDbError extends InfrastructureError {}

/* ====================================================== */
/*                      Public API                        */
/* ====================================================== */

module.exports = { MongoDbError };
