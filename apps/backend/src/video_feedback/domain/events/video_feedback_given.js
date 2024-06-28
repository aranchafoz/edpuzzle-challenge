const { Event } = require("shared/action");

class VideoFeedbackGivenEvent extends Event {
  static get type() {
    return "video_feedback.1.event.video_feedback_given";
  }
  static create(newVideoFeedback) {
    return new this({
      type: this.type,
      attributes: {
        id: newVideoFeedback.getId().toValue(),
        videoId: newVideoFeedback.getVideoId().toValue(),
        isPositive: newVideoFeedback.getIsPositive().toValue(),
        occurredOn: newVideoFeedback.getOccurredOn().toValue(),
      },
      meta: {},
    });
  }
}

module.exports = { VideoFeedbackGivenEvent };
