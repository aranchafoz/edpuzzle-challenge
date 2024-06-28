const _ = require("lodash");
const { DataMappingError } = require("shared/domain/errors/errors");
const { MongoDbError } = require("shared/infrastructure/mongodb/mongodb_error");
const { ObjectId } = require("mongodb");
const { paginateQuery } = require("shared/infrastructure/mongodb/pagination");

/* ====================================================== */
/*                         Domain                         */
/* ====================================================== */

const {
  VideoViewsCounter,
} = require("video_views_counter/domain/aggregate/video_views_counter");
const { Id } = require("shared/domain/value_objects/id");
const { Counter } = require("video_views_counter/domain/value_objects/counter");
const { UTCTimestamp } = require("shared/domain/value_objects/utc_timestamp");

/* ====================================================== */
/*                    Implementation                      */
/* ====================================================== */

class MongoDbVideoViewsCounterRepository {
  constructor({ db, env }) {
    this.env = env;
    this.collection = db.collection("video_views_counter");
  }

  // Read
  // ----

  async findByVideoId(videoId) {
    try {
      const databaseVideoViewsCounter = await this.collection.findOne({
        videoId: new ObjectId(videoId.toValue()),
      });
      return toAggregate(databaseVideoViewsCounter);
    } catch (err) {
      if (err.isDomainError) throw err;
      throw new MongoDbError({ err });
    }
  }

  // Write
  // -----

  async save(videoViewsCounter) {
    try {
      if (videoViewsCounter.isNew) {
        await this.collection.insertOne(toDatabase(videoViewsCounter));
        return;
      }

      const { counter, ...dataToSet } = toDatabase(videoViewsCounter);

      const counterIncrement =
        videoViewsCounter._attributes.counter.toValue() -
        videoViewsCounter._initialAttributes.counter.toValue();

      await this.collection.findOneAndUpdate(
        { _id: new ObjectId(videoViewsCounter.getId().toValue()) },
        { $inc: { counter: counterIncrement }, $set: dataToSet }
      );

      videoViewsCounter.isNew = false;
      return videoViewsCounter;
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

/* ====================================================== */
/*                      Public API                        */
/* ====================================================== */

module.exports = { MongoDbVideoViewsCounterRepository };

/* ====================================================== */
/*                      Data Mapper                       */
/* ====================================================== */

class VideoViewsCounterDataMapperError extends DataMappingError {}

function toAggregate(data) {
  if (_.isEmpty(data)) return;
  try {
    return new VideoViewsCounter(
      {
        id: new Id(data._id.toString()),
        videoId: new Id(data.videoId.toString()),
        counter: new Counter(data.counter),
        updatedAt: new UTCTimestamp(data.updatedAt),
      },
      { isNew: false }
    );
  } catch (err) {
    throw new VideoViewsCounterDataMapperError({ err });
  }
}

function toAggregates(data = []) {
  if (_.isEmpty(data)) return [];
  return _.map(data, (d) => toAggregate(d));
}

function toDatabase(videoViewsCounter) {
  if (_.isEmpty(videoViewsCounter)) return;
  return {
    _id: new ObjectId(videoViewsCounter.getId().toValue()),
    videoId: new ObjectId(videoViewsCounter.getVideoId().toValue()),
    counter: videoViewsCounter.getCounter().toValue(),
    updatedAt: videoViewsCounter.getUpdatedAt().toValue(),
  };
}
