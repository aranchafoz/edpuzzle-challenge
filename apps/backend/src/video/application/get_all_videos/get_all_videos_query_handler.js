const { Query } = require("shared/action");
const { getAllVideosUseCase } = require("./get_all_videos_use_case");
const VideoResponse = require("video/application/video_response");
const ErrorResponse = require("shared/application/error_response");

/* ====================================================== */
/*                         Domain                         */
/* ====================================================== */

const { Cursor } = require("shared/domain/value_objects/cursor");
const { PageSize } = require("shared/domain/value_objects/page_size");

/* ====================================================== */
/*                          Query                         */
/* ====================================================== */

class GetAllVideosQuery extends Query {
  static get type() {
    return "video.1.query.get_all_videos";
  }
  static create({ pageToken = "", pageSize = 10 }) {
    return new this({
      type: this.type,
      attributes: { pageToken, pageSize },
      meta: {},
    });
  }
}

/* ====================================================== */
/*                        Handler                         */
/* ====================================================== */

async function handleGetAllVideosQuery(query, dependencies) {
  try {
    const { videos, nextPageToken, resultsPerPage } = await getAllVideosUseCase(
      {
        pageSize: new PageSize(query.getAttributes().pageSize),
        pageToken: new Cursor(query.getAttributes().pageToken),
      },
      dependencies
    );
    return {
      data: {
        nextPageToken,
        resultsPerPage,
        videos: VideoResponse.convertMany(videos),
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
  GetAllVideosQuery,
  handleGetAllVideosQuery,
};
