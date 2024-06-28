const {
  incrementVideViewsCounterUseCase,
} = require("./increment_video_views_counter_use_case");
const VideoViewsCounterResponse = require("video_views_counter/application/video_views_counter_response");
const ErrorResponse = require("shared/application/error_response");

/* ====================================================== */
/*                         Domain                         */
/* ====================================================== */

const { Id } = require("shared/domain/value_objects/id");

/* ====================================================== */
/*                        Handler                         */
/* ====================================================== */

async function handleIncrementVideoViewsCounterOnVideoViewsTrackedEventHandler(
  event,
  dependencies
) {
  try {
    const videoViewsCounter = await incrementVideViewsCounterUseCase(
      { videoId: new Id(event.getAttributes().videoId) },
      dependencies
    );
    return {
      data: VideoViewsCounterResponse.convert(videoViewsCounter),
      error: null,
    };
  } catch (err) {
    return { data: undefined, error: ErrorResponse.convert(err) };
  }
}

/* ====================================================== */
/*                      Public API                        */
/* ====================================================== */

module.exports = {
  handleIncrementVideoViewsCounterOnVideoViewsTrackedEventHandler,
};
