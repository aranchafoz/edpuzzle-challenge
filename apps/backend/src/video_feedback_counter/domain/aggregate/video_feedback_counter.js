const { AggregateRoot } = require("shared/domain/aggregate/aggregate_root");

const {
  VideoFeedbackCounterIncremented,
} = require("../events/video_feedback_counter_incremented");

const { Id } = require("shared/domain/value_objects/id");
const { Counter } = require("video_feedback_counter/domain/value_objects/counter");
const { UTCTimestamp } = require("shared/domain/value_objects/utc_timestamp");

class VideoFeedbackCounter extends AggregateRoot {
  constructor({ id, videoId, counter, likeCounter, dislikeCounter, updatedAt }, opts) {
    super({ id, videoId, counter, likeCounter, dislikeCounter, updatedAt }, opts);
  }

  static increment({ videoId }) {
    const newVideoViewCounter = new this({
      id: Id.random(),
      videoId,
      counter: new Counter(1),
      likeCounter: Counter.zero(),
      dislikeCounter: Counter.zero(),
      updatedAt: UTCTimestamp.now(),
    });
    newVideoViewCounter.record(
      VideoFeedbackCounterIncremented.create(newVideoViewCounter)
    );
    return newVideoViewCounter;
  }

  static incrementLikes({ videoId }) {
    const newVideoViewCounter = new this({
      id: Id.random(),
      videoId,
      counter: Counter.zero(),
      likeCounter: new Counter(1),
      dislikeCounter: Counter.zero(),
      updatedAt: UTCTimestamp.now(),
    });
    newVideoViewCounter.record(
      VideoFeedbackCounterIncremented.create(newVideoViewCounter)
    );
    return newVideoViewCounter;
  }

  static incrementDislikes({ videoId }) {
    const newVideoViewCounter = new this({
      id: Id.random(),
      videoId,
      counter: Counter.zero(),
      likeCounter: Counter.zero(),
      dislikeCounter: new Counter(1),
      updatedAt: UTCTimestamp.now(),
    });
    newVideoViewCounter.record(
      VideoFeedbackCounterIncremented.create(newVideoViewCounter)
    );
    return newVideoViewCounter;
  }

  static random(
    {
      id = Id.random(),
      videoId = VideoId.random(),
      counter = Counter.random(),
      likeCounter = Counter.random(),
      dislikeCounter = Counter.random(),
      updatedAt = UTCTimestamp.random(),
    } = {},
    opts
  ) {
    return new this({ id, videoId, counter, likeCounter, dislikeCounter, updatedAt }, opts);
  }

  getId() {
    return this._attributes.id;
  }
  getVideoId() {
    return this._attributes.videoId;
  }
  getCounter() {
    return this._attributes.counter;
  }
  getLikeCounter() {
    return this._attributes.likeCounter;
  }
  getDislikeCounter() {
    return this._attributes.dislikeCounter;
  }
  getUpdatedAt() {
    return this._attributes.updatedAt;
  }

  increment() {
    this._attributes.counter = new Counter(
      this._attributes.counter.toValue() + 1
    );
    this._attributes.updatedAt = UTCTimestamp.now();
    this.record(VideoFeedbackCounterIncremented.create(this));
  }

  incrementLikes() {
    this._attributes.likeCounter = new Counter(
      this._attributes.likeCounter.toValue() + 1
    );
    this._attributes.updatedAt = UTCTimestamp.now();
    this.record(VideoFeedbackCounterIncremented.create(this));
  }

  incrementDislikes() {
    this._attributes.dislikeCounter = new Counter(
      this._attributes.dislikeCounter.toValue() + 1
    );
    this._attributes.updatedAt = UTCTimestamp.now();
    this.record(VideoFeedbackCounterIncremented.create(this));
  }
}

module.exports = { VideoFeedbackCounter };
