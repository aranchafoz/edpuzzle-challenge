const { Query } = require("shared/action");
const { getVideoByIdUseCase } = require("./get_video_by_id_use_case");
const VideoResponse = require("video/application/video_response");
const ErrorResponse = require("shared/application/error_response");

/* ====================================================== */
/*                         Domain                         */
/* ====================================================== */

const { Id } = require("shared/domain/value_objects/id");

/* ====================================================== */
/*                          Query                         */
/* ====================================================== */

class GetVideoByIdQuery extends Query {
  static get type() {
    return "video.1.query.get_video_by_id";
  }
  static create({ id }) {
    return new this({
      type: this.type,
      attributes: { id },
      meta: {},
    });
  }
}

/* ====================================================== */
/*                        Handler                         */
/* ====================================================== */

async function handleGetVideoByIdQuery(query, dependencies) {
  try {
    const video = await getVideoByIdUseCase(
      { id: new Id(query.getAttributes().id) },
      dependencies
    );
    return {
      data: VideoResponse.convert(video),
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
  GetVideoByIdQuery,
  handleGetVideoByIdQuery,
};
