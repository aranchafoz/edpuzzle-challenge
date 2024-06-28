const _ = require("lodash");
const { DataMappingError } = require("shared/domain/errors/errors");
const { MongoDbError } = require("shared/infrastructure/mongodb/mongodb_error");
const { ObjectId } = require("mongodb");
const { paginateQuery } = require("shared/infrastructure/mongodb/pagination");

/* ====================================================== */
/*                         Domain                         */
/* ====================================================== */

const { Video } = require("video/domain/aggregate/video");
const { Id } = require("shared/domain/value_objects/id");
const { VideoId } = require("video/domain/value_objects/video_id");
const { VideoAuthor } = require("video/domain/value_objects/video_author");
const { VideoTitle } = require("video/domain/value_objects/video_title");
const {
  VideoQuestions,
} = require("video/domain/value_objects/video_questions");

/* ====================================================== */
/*                    Implementation                      */
/* ====================================================== */

class MongoDbVideoRepository {
  constructor({ db, env }) {
    this.env = env;
    this.collection = db.collection("videos");
  }

  // Read
  // ----

  async findById(id) {
    try {
      const databaseVideo = await this.collection.findOne({
        _id: new ObjectId(id.toValue()),
      });
      return toAggregate(databaseVideo);
    } catch (err) {
      if (err.isDomainError) throw err;
      throw new MongoDbError({ err });
    }
  }

  async findAll({ cursor, limit, sortBy = "createdAt", order = "desc" } = {}) {
    try {
      const { results, nextCursor } = await paginateQuery({
        query: {},
        cursor,
        limit,
        sortBy,
        order,
        collection: this.collection,
      });
      return { results: toAggregates(results), cursor: nextCursor };
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

module.exports = { MongoDbVideoRepository };

/* ====================================================== */
/*                      Data Mapper                       */
/* ====================================================== */

class VideoDataMapperError extends DataMappingError {}

function toAggregate(data) {
  if (_.isEmpty(data)) return;
  try {
    return new Video(
      {
        id: new Id(data._id.toString()),
        videoId: new VideoId(data.videoId),
        title: new VideoTitle(data.title),
        author: new VideoAuthor(data.author),
        questions: new VideoQuestions(data.questions),
      },
      { isNew: false }
    );
  } catch (err) {
    throw new VideoDataMapperError({ err });
  }
}

function toAggregates(data = []) {
  if (_.isEmpty(data)) return [];
  return _.map(data, (d) => toAggregate(d));
}
