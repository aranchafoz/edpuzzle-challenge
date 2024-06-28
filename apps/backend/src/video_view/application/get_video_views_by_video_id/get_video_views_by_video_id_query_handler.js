const { Query } = require("shared/action");
const {
  getVideoViewsByVideoIdUseCase,
} = require("./get_video_views_by_video_id_use_case");
const VideoViewResponse = require("video_view/application/video_view_response");
const ErrorResponse = require("shared/application/error_response");

/* ====================================================== */
/*                         Domain                         */
/* ====================================================== */

const { Id } = require("shared/domain/value_objects/id");
const { Cursor } = require("shared/domain/value_objects/cursor");
const { PageSize } = require("shared/domain/value_objects/page_size");

/* ====================================================== */
/*                          Query                         */
/* ====================================================== */

class GetVideoViewsByVideoIdQuery extends Query {
  static get type() {
    return "video_view.1.query.get_video_views_by_video_id";
  }
  static create({ videoId, pageToken = "", pageSize = 10 }) {
    return new this({
      type: this.type,
      attributes: { videoId, pageToken, pageSize },
      meta: {},
    });
  }
}

/* ====================================================== */
/*                        Handler                         */
/* ====================================================== */

async function handleGetVideoViewsByVideoIdQuery(query, dependencies) {
  try {
    const { videoViews, nextPageToken, resultsPerPage } =
      await getVideoViewsByVideoIdUseCase(
        {
          videoId: new Id(query.getAttributes().videoId),
          pageSize: new PageSize(query.getAttributes().pageSize),
          pageToken: new Cursor(query.getAttributes().pageToken),
        },
        dependencies
      );
    return {
      data: {
        nextPageToken,
        resultsPerPage,
        videoViews: VideoViewResponse.convertMany(videoViews),
      },
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
  GetVideoViewsByVideoIdQuery,
  handleGetVideoViewsByVideoIdQuery,
};
