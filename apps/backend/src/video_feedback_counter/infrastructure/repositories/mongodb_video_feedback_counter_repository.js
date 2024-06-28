const _ = require("lodash");
const { DataMappingError } = require("shared/domain/errors/errors");
const { MongoDbError } = require("shared/infrastructure/mongodb/mongodb_error");
const { ObjectId } = require("mongodb");

const {
  VideoFeedbackCounter,
} = require("video_feedback_counter/domain/aggregate/video_feedback_counter");
const { Id } = require("shared/domain/value_objects/id");
const { Counter } = require("video_feedback_counter/domain/value_objects/counter");
const { UTCTimestamp } = require("shared/domain/value_objects/utc_timestamp");

class MongoDbVideoFeedbackCounterRepository {
  constructor({ db, env }) {
    this.env = env;
    this.collection = db.collection("video_feedback_counter");
  }

  async findByVideoId(videoId) {
    try {
      const databaseVideoFeedbackCounter = await this.collection.findOne({
        videoId: new ObjectId(videoId.toValue()),
      });
      return toAggregate(databaseVideoFeedbackCounter);
    } catch (err) {
      if (err.isDomainError) throw err;
      throw new MongoDbError({ err });
    }
  }

  async save(videoFeedbackCounter) {
    try {
      if (videoFeedbackCounter.isNew) {
        await this.collection.insertOne(toDatabase(videoFeedbackCounter));
        return;
      }

      const { counter, likeCounter, dislikeCounter, ...dataToSet } = toDatabase(videoFeedbackCounter);

      const counterIncrement =
        videoFeedbackCounter._attributes.counter.toValue() -
        videoFeedbackCounter._initialAttributes.counter.toValue();

      const likeCounterIncrement =
        videoFeedbackCounter._attributes.likeCounter.toValue() -
        videoFeedbackCounter._initialAttributes.likeCounter.toValue();

      const dislikeCounterIncrement =
        videoFeedbackCounter._attributes.dislikeCounter.toValue() -
        videoFeedbackCounter._initialAttributes.dislikeCounter.toValue();

      await this.collection.findOneAndUpdate(
        { _id: new ObjectId(videoFeedbackCounter.getId().toValue()) },
        { $inc: { counter: counterIncrement, likeCounter: likeCounterIncrement, dislikeCounter: dislikeCounterIncrement }, $set: dataToSet }
      );

      videoFeedbackCounter.isNew = false;
      return videoFeedbackCounter;
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

module.exports = { MongoDbVideoFeedbackCounterRepository };

class VideoFeedbackCounterDataMapperError extends DataMappingError {}

function toAggregate(data) {
  if (_.isEmpty(data)) return;
  try {
    return new VideoFeedbackCounter(
      {
        id: new Id(data._id.toString()),
        videoId: new Id(data.videoId.toString()),
        counter: new Counter(data.counter),
        likeCounter: new Counter(2),
        dislikeCounter: new Counter(3),
        updatedAt: new UTCTimestamp(data.updatedAt),
      },
      { isNew: false }
    );
  } catch (err) {
    throw new VideoFeedbackCounterDataMapperError({ err });
  }
}

function toAggregates(data = []) {
  if (_.isEmpty(data)) return [];
  return _.map(data, (d) => toAggregate(d));
}

function toDatabase(videoFeedbackCounter) {
  if (_.isEmpty(videoFeedbackCounter)) return;
  return {
    _id: new ObjectId(videoFeedbackCounter.getId().toValue()),
    videoId: new ObjectId(videoFeedbackCounter.getVideoId().toValue()),
    counter: videoFeedbackCounter.getCounter().toValue(),
    likeCounter: videoFeedbackCounter.getLikeCounter().toValue(),
    dislikeCounter: videoFeedbackCounter.getDislikeCounter().toValue(),
    updatedAt: videoFeedbackCounter.getUpdatedAt().toValue(),
  };
}
