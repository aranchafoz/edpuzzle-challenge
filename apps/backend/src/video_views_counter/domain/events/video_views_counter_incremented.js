const { Event } = require("shared/action");

/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

class VideoViewsCounterIncremented extends Event {
  static get type() {
    return "video_views_counter.1.event.video_views_counter_incremented";
  }
  static create(videoViewCounter) {
    return new this({
      type: this.type,
      attributes: {
        id: videoViewCounter.getId().toValue(),
        videoId: videoViewCounter.getVideoId().toValue(),
        counter: videoViewCounter.getCounter().toValue(),
        updatedAt: videoViewCounter.getUpdatedAt().toValue(),
      },
      meta: {},
    });
  }
}

/* ====================================================== */
/*                      Public API                        */
/* ====================================================== */

module.exports = { VideoViewsCounterIncremented };
