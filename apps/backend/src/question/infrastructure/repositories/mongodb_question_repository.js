const _ = require("lodash");
const { DataMappingError } = require("shared/domain/errors/errors");
const { MongoDbError } = require("shared/infrastructure/mongodb/mongodb_error");
const { ObjectId } = require("mongodb");

/* ====================================================== */
/*                         Domain                         */
/* ====================================================== */

const { Question } = require("question/domain/aggregate/question");
const { Id } = require("shared/domain/value_objects/id");
const { QuestionText } = require("question/domain/value_objects/question_text");

/* ====================================================== */
/*                    Implementation                      */
/* ====================================================== */

class MongoDbQuestionRepository {
  constructor({ db, env }) {
    this.env = env;
    this.collection = db.collection("questions");
  }

  // Read
  // ----

  async findByIds(ids) {
    try {
      const databaseQuestions = await this.collection
        .find({ _id: { $in: _.map(ids, (id) => new ObjectId(id.toValue())) } })
        .toArray();

      return toAggregates(databaseQuestions);
    } catch (err) {
      if (err.isDomainError) throw err;
      throw new MongoDbError({ err });
    }
  }

  // Write
  // -----

  async drop() {
    if (!this.env.isTesting) {
      throw new Error("No collection drops allowed");
    }
    await this.collection.drop();
  }
}

/* ====================================================== */
/*                      Public API                        */
/* ====================================================== */

module.exports = { MongoDbQuestionRepository };

/* ====================================================== */
/*                      Data Mapper                       */
/* ====================================================== */

class QuestionDataMapperError extends DataMappingError {}

function toAggregate(data) {
  if (_.isEmpty(data)) return;
  try {
    return new Question(
      {
        id: new Id(data._id.toString()),
        text: new QuestionText(data.text),
      },
      { isNew: false }
    );
  } catch (err) {
    throw new QuestionDataMapperError({ err });
  }
}

function toAggregates(data = []) {
  if (_.isEmpty(data)) return [];
  return _.map(data, (d) => toAggregate(d));
}
