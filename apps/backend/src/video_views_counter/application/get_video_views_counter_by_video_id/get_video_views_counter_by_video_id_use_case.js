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
/*                       Command                          */
/* ====================================================== */

async function getVideoViewsCounterByVideoIdUseCase(
  { videoId },
  { videoViewsCounterRepository }
) {
  const videoViewsCounter = await videoViewsCounterRepository.findByVideoId(
    videoId
  );
  return (
    videoViewsCounter ||
    new VideoViewsCounter({
      id: Id.random(),
      videoId,
      counter: new Counter(0),
      updatedAt: UTCTimestamp.now(),
    })
  );
}

/* ====================================================== */
/*                      Public API                        */
/* ====================================================== */

module.exports = { getVideoViewsCounterByVideoIdUseCase };
