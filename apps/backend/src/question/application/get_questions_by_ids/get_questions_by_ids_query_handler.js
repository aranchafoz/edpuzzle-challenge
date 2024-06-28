const { Query } = require("shared/action");
const { getQuestionsByIds } = require("./get_questions_by_ids_use_case");
const QuestionResponse = require("question/application/question_response");
const ErrorResponse = require("shared/application/error_response");

/* ====================================================== */
/*                         Domain                         */
/* ====================================================== */

const { Id } = require("shared/domain/value_objects/id");

/* ====================================================== */
/*                          Query                         */
/* ====================================================== */

class GetQuestionsByIdsQuery extends Query {
  static get type() {
    return "question.1.query.get_questions_by_ids";
  }
  static create({ ids }) {
    return new this({
      type: this.type,
      attributes: { ids },
      meta: {},
    });
  }
}

/* ====================================================== */
/*                        Handler                         */
/* ====================================================== */

async function handleGetQuestionsByIdsQuery(query, dependencies) {
  try {
    const questions = await getQuestionsByIds(
      { ids: query.getAttributes().ids.map((id) => new Id(id)) },
      dependencies
    );
    return {
      data: QuestionResponse.convertMany(questions),
      error: null,
    };
  } catch (err) {
    return { data: undefined, error: ErrorResponse.convert(err) };
  }
}

/* ====================================================== */
/*                      Public API                        */
/* ====================================================== */

module.exports = {
  GetQuestionsByIdsQuery,
  handleGetQuestionsByIdsQuery,
};
