const { Event } = require("shared/action");

class VideoFeedbackCounterIncremented extends Event {
  static get type() {
    return "video_feedback_counter.1.event.video_feedback_counter_incremented";
  }
  static create(videoFeedbackCounter) {
    return new this({
      type: this.type,
      attributes: {
        id: videoFeedbackCounter.getId().toValue(),
        videoId: videoFeedbackCounter.getVideoId().toValue(),
        counter: videoFeedbackCounter.getCounter().toValue(),
        likeCounter: videoFeedbackCounter.getLikeCounter().toValue(),
        dislikeCounter: videoFeedbackCounter.getDislikeCounter().toValue(),
        updatedAt: videoFeedbackCounter.getUpdatedAt().toValue(),
      },
      meta: {},
    });
  }
}

module.exports = { VideoFeedbackCounterIncremented };
