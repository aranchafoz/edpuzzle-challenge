const _ = require("lodash");
const { DataMappingError } = require("shared/domain/errors/errors");
const { MongoDbError } = require("shared/infrastructure/mongodb/mongodb_error");
const { ObjectId } = require("mongodb");
const { paginateQuery } = require("shared/infrastructure/mongodb/pagination");

/* ====================================================== */
/*                         Domain                         */
/* ====================================================== */

const { VideoView } = require("video_view/domain/aggregate/video_view");
const { Id } = require("shared/domain/value_objects/id");
const { UTCTimestamp } = require("shared/domain/value_objects/utc_timestamp");

/* ====================================================== */
/*                    Implementation                      */
/* ====================================================== */

class MongoDbVideoViewRepository {
  constructor({ db, env }) {
    this.env = env;
    this.collection = db.collection("video_views");
  }

  // Read
  // ----

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

  // Write
  // -----

  async save(videoView) {
    try {
      const data = toDatabase(videoView);
      if (_.isEmpty(data)) return videoView;
      await this.collection.updateOne(
        { _id: new ObjectId(videoView.getId().toValue()) },
        { $set: data },
        { upsert: true }
      );

      videoView.isNew = false;
      return videoView;
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

module.exports = { MongoDbVideoViewRepository };

/* ====================================================== */
/*                      Data Mapper                       */
/* ====================================================== */

class VideoViewDataMapperError extends DataMappingError {}

function toAggregate(data) {
  if (_.isEmpty(data)) return;
  try {
    return new VideoView(
      {
        id: new Id(data._id.toString()),
        videoId: new Id(data.videoId.toString()),
        occurredOn: new UTCTimestamp(data.occurredOn),
      },
      { isNew: false }
    );
  } catch (err) {
    throw new VideoViewDataMapperError({ err });
  }
}

function toAggregates(data = []) {
  if (_.isEmpty(data)) return [];
  return _.map(data, (d) => toAggregate(d));
}

function toDatabase(videoView) {
  if (_.isEmpty(videoView)) return;
  return {
    _id: new ObjectId(videoView.getId().toValue()),
    videoId: new ObjectId(videoView.getVideoId().toValue()),
    occurredOn: videoView.getOccurredOn().toValue(),
  };
}
