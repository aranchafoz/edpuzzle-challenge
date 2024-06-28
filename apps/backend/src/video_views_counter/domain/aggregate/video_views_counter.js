const { AggregateRoot } = require("shared/domain/aggregate/aggregate_root");

/* ====================================================== */
/*                     Domain Errors                      */
/* ====================================================== */

/* ====================================================== */
/*                        Events                          */
/* ====================================================== */

const {
  VideoViewsCounterIncremented,
} = require("../events/video_views_counter_incremented");

/* ====================================================== */
/*                    Value Objects                       */
/* ====================================================== */

const { Id } = require("shared/domain/value_objects/id");
const { Counter } = require("video_views_counter/domain/value_objects/counter");
const { UTCTimestamp } = require("shared/domain/value_objects/utc_timestamp");

/* ====================================================== */
/*                    Implementation                      */
/* ====================================================== */

class VideoViewsCounter extends AggregateRoot {
  constructor({ id, videoId, counter, updatedAt }, opts) {
    super({ id, videoId, counter, updatedAt }, opts);
  }

  // Named constructors
  // ------------------

  static increment({ videoId }) {
    const newVideoViewCounter = new this({
      id: Id.random(),
      videoId,
      counter: new Counter(1),
      updatedAt: UTCTimestamp.now(),
    });
    newVideoViewCounter.record(
      VideoViewsCounterIncremented.create(newVideoViewCounter)
    );
    return newVideoViewCounter;
  }

  static random(
    {
      id = Id.random(),
      videoId = VideoId.random(),
      counter = Counter.random(),
      updatedAt = UTCTimestamp.random(),
    } = {},
    opts
  ) {
    return new this({ id, videoId, counter, updatedAt }, opts);
  }

  // Getters
  // -------

  getId() {
    return this._attributes.id;
  }
  getVideoId() {
    return this._attributes.videoId;
  }
  getCounter() {
    return this._attributes.counter;
  }
  getUpdatedAt() {
    return this._attributes.updatedAt;
  }

  // Methods
  // -------

  increment() {
    this._attributes.counter = new Counter(
      this._attributes.counter.toValue() + 1
    );
    this._attributes.updatedAt = UTCTimestamp.now();
    this.record(VideoViewsCounterIncremented.create(this));
  }
}

/* ====================================================== */
/*                      Public API                        */
/* ====================================================== */

module.exports = { VideoViewsCounter };
