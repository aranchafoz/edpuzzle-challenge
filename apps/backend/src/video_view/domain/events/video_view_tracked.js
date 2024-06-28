const { Event } = require("shared/action");

/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

class VideoViewTrackedEvent extends Event {
  static get type() {
    return "video_view.1.event.video_view_tracked";
  }
  static create(videoView) {
    return new this({
      type: this.type,
      attributes: {
        id: videoView.getId().toValue(),
        videoId: videoView.getVideoId().toValue(),
        occurredOn: videoView.getOccurredOn().toValue(),
      },
      meta: {},
    });
  }
}

/* ====================================================== */
/*                      Public API                        */
/* ====================================================== */

module.exports = { VideoViewTrackedEvent };
