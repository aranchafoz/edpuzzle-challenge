const { Query } = require("shared/action");
const {
  getVideoViewsCounterByVideoIdUseCase,
} = require("./get_video_views_counter_by_video_id_use_case");
const VideoViewsCounterResponse = require("video_views_counter/application/video_views_counter_response");
const ErrorResponse = require("shared/application/error_response");

/* ====================================================== */
/*                         Domain                         */
/* ====================================================== */

const { Id } = require("shared/domain/value_objects/id");

/* ====================================================== */
/*                          Query                         */
/* ====================================================== */

class GetVideoViewsCounterByVideoIdQuery extends Query {
  static get type() {
    return "video_views_counter.1.query.get_video_views_counter_by_video_id";
  }
  static create({ videoId }) {
    return new this({
      type: this.type,
      attributes: { videoId },
      meta: {},
    });
  }
}

/* ====================================================== */
/*                        Handler                         */
/* ====================================================== */

async function handleGetVideoViewsCounterByVideoIdQuery(query, dependencies) {
  try {
    const videoViewsCounter = await getVideoViewsCounterByVideoIdUseCase(
      { videoId: new Id(query.getAttributes().videoId) },
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
  GetVideoViewsCounterByVideoIdQuery,
  handleGetVideoViewsCounterByVideoIdQuery,
};
