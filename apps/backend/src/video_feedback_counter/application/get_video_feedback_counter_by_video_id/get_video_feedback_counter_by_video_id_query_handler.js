const { Query } = require("shared/action");
const {
  getVideoFeedbackCounterByVideoIdUseCase,
} = require("./get_video_feedback_counter_by_video_id_use_case");
const VideoFeedbackCounterResponse = require("video_feedback_counter/application/video_feedback_counter_response");
const ErrorResponse = require("shared/application/error_response");

/* ====================================================== */
/*                         Domain                         */
/* ====================================================== */

const { Id } = require("shared/domain/value_objects/id");

/* ====================================================== */
/*                          Query                         */
/* ====================================================== */

class GetVideoFeedbackCounterByVideoIdQuery extends Query {
  static get type() {
    return "video_feedback_counter.1.query.get_video_feedback_counter_by_video_id";
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

async function handleGetVideoFeedbackCounterByVideoIdQuery(query, dependencies) {
  try {
    const videoFeedbackCounter = await getVideoFeedbackCounterByVideoIdUseCase(
      { videoId: new Id(query.getAttributes().videoId) },
      dependencies
    );
    return {
      data: VideoFeedbackCounterResponse.convert(videoFeedbackCounter),
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
  GetVideoFeedbackCounterByVideoIdQuery,
  handleGetVideoFeedbackCounterByVideoIdQuery,
};
