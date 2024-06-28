const _ = require("lodash");
const { DataMappingError } = require("shared/domain/errors/errors");
const { MongoDbError } = require("shared/infrastructure/mongodb/mongodb_error");
const { ObjectId } = require("mongodb");
const { paginateQuery } = require("shared/infrastructure/mongodb/pagination");

const { VideoFeedback } = require("video_feedback/domain/aggregate/video_feedback");
const { Id } = require("shared/domain/value_objects/id");
const { UTCTimestamp } = require("shared/domain/value_objects/utc_timestamp");

const { VideoId } = require("video/domain/value_objects/video_id");
const { VideoFeedbackIsPositive } = require("video_feedback/domain/value_objects/video_feedback_is_positive");

class MongoDbVideoFeedbackRepository {
  constructor({ db, env }) {
    this.env = env;
    this.collection = db.collection("video_feedbacks");
  }

  async findByVideoId(
    videoId,
    { cursor, limit, sortBy = "createdAt", order = "asc" } = {}
  ) {
    try {
      const { results, nextCursor } = await paginateQuery({
        query: { videoId: new ObjectId(videoId.toValue()) },
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

  async save(videoFeedback) {
    try {
      const data = toDatabase(videoFeedback);
      if (_.isEmpty(data)) return videoFeedback;
      await this.collection.updateOne(
        { _id: new ObjectId(videoFeedback.getId().toValue()) },
        { $set: data },
        { upsert: true }
      );

      videoFeedback.isNew = false;
      return videoFeedback;
    } catch (err) {
      if (err.isDomainError) throw err;
      throw new MongoDbError({ err });
    }
  }

  async drop() {
    if (!this.env.isTesting) {
      throw new Error("No collection drops allowed");
    }
    await this.collection.drop();
  }
}

module.exports = { MongoDbVideoFeedbackRepository };

class VideoFeedbackDataMapperError extends DataMappingError {}

function toAggregate(data) {
  if (_.isEmpty(data)) return;
  try {
    return new VideoFeedback(
      {
        id: new Id(data._id.toString()),
        videoId: new VideoId(data.videoId.toString()),
        isPositive: new VideoFeedbackIsPositive(data.isPositive),
        occurredOn: new UTCTimestamp(data.occurredOn),
      },
      { isNew: false }
    );
  } catch (err) {
    throw new VideoFeedbackDataMapperError({ err });
  }
}

function toAggregates(data = []) {
  if (_.isEmpty(data)) return [];
  return _.map(data, (d) => toAggregate(d));
}

function toDatabase(videoFeedback) {
  if (_.isEmpty(videoFeedback)) return;
  return {
    _id: new ObjectId(videoFeedback.getId().toValue()),
    videoId: new ObjectId(videoFeedback.getVideoId().toValue()),
    isPositive: new Boolean(videoFeedback.getIsPositive().toValue()),
    occurredOn: videoFeedback.getOccurredOn().toValue(),
  };
}
