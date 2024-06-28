const { AggregateRoot } = require("shared/domain/aggregate/aggregate_root");

const { VideoFeedbackGivenEvent } = require("../events/video_feedback_given");

const { Id } = require("shared/domain/value_objects/id");
const { UTCTimestamp } = require("shared/domain/value_objects/utc_timestamp");

const { VideoId } = require("video/domain/value_objects/video_id");
const { VideoFeedbackIsPositive } = require("video_feedback/domain/value_objects/video_feedback_is_positive");

class VideoFeedback extends AggregateRoot {
  constructor({ id, videoId, isPositive, occurredOn }, opts) {
    super({ id, videoId, isPositive, occurredOn }, opts);
  }

  static give({ videoId, isPositive }) {
    const newVideoFeedback = new this({
      id: Id.random(),
      videoId,
      isPositive: new VideoFeedbackIsPositive(isPositive),
      occurredOn: UTCTimestamp.now(),
    });
    newVideoFeedback.record(VideoFeedbackGivenEvent.create(newVideoFeedback));
    return newVideoFeedback;
  }

  static random(
    {
      id = Id.random(),
      videoId = VideoId.random(),
      isPositive = VideoFeedbackIsPositive.random(),
      occurredOn = UTCTimestamp.random(),
    } = {},
    opts
  ) {
    return new this({ id, videoId, isPositive, occurredOn }, opts);
  }

  getId() {
    return this._attributes.id;
  }
  getVideoId() {
    return this._attributes.videoId;
  }
  getIsPositive() {
    return this._attributes.isPositive;
  }
  getOccurredOn() {
    return this._attributes.occurredOn;
  }
}

module.exports = { VideoFeedback };