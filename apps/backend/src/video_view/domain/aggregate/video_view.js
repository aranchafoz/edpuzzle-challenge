const { AggregateRoot } = require("shared/domain/aggregate/aggregate_root");

/* ====================================================== */
/*                     Domain Errors                      */
/* ====================================================== */

/* ====================================================== */
/*                        Events                          */
/* ====================================================== */

const { VideoViewTrackedEvent } = require("../events/video_view_tracked");

/* ====================================================== */
/*                    Value Objects                       */
/* ====================================================== */

const { Id } = require("shared/domain/value_objects/id");
const { UTCTimestamp } = require("shared/domain/value_objects/utc_timestamp");

/* ====================================================== */
/*                    Implementation                      */
/* ====================================================== */

class VideoView extends AggregateRoot {
  constructor({ id, videoId, occurredOn }, opts) {
    super({ id, videoId, occurredOn }, opts);
  }

  // Named constructors
  // ------------------

  static track({ videoId }) {
    const newVideoView = new this({
      id: Id.random(),
      videoId,
      occurredOn: UTCTimestamp.now(),
    });
    newVideoView.record(VideoViewTrackedEvent.create(newVideoView));
    return newVideoView;
  }

  static random(
    {
      id = Id.random(),
      videoId = VideoId.random(),
      occurredOn = UTCTimestamp.random(),
    } = {},
    opts
  ) {
    return new this({ id, videoId, occurredOn }, opts);
  }

  // Getters
  // -------

  getId() {
    return this._attributes.id;
  }
  getVideoId() {
    return this._attributes.videoId;
  }
  getOccurredOn() {
    return this._attributes.occurredOn;
  }

  // Methods
  // -------
}

/* ====================================================== */
/*                      Public API                        */
/* ====================================================== */

module.exports = { VideoView };
