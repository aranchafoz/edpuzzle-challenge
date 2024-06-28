/* ====================================================== */
/*                     Dependencies                       */
/* ====================================================== */

const {
  MongoDbQuestionRepository,
} = require("./infrastructure/repositories/mongodb_question_repository");

/* ====================================================== */
/*                        Events                          */
/* ====================================================== */

/* ====================================================== */
/*                       Handlers                         */
/* ====================================================== */

// Command Handlers
// ----------------

// Query Handlers
// --------------

const {
  handleGetQuestionsByIdsQuery,
  GetQuestionsByIdsQuery,
} = require("./application/get_questions_by_ids/get_questions_by_ids_query_handler");

// Event Handlers
// --------------

/* ====================================================== */
/*                      Public API                        */
/* ====================================================== */

module.exports = {
  name: "question",
  // Handlers
  eventHandlers: {},
  commandHandlers: {},
  queryHandlers: {
    [GetQuestionsByIdsQuery.type]: handleGetQuestionsByIdsQuery,
  },
  // Dependencies
  createModuleDependencyResolver,
};

/* ====================================================== */
/*                     Implementation                     */
/* ====================================================== */

function createModuleDependencyResolver({ mongoConnection, env }) {
  const questionRepository = new MongoDbQuestionRepository({
    db: mongoConnection,
    env,
  });
  return () => ({ questionRepository });
}
