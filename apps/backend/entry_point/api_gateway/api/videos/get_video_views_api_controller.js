// TBD
const {
  httpResponse,
  HTTP_STATUS_CODES,
} = require("api_gateway/http_response");

/* ====================================================== */
/*                      Application                       */
/* ====================================================== */

const { GetVideoViewsByVideoIdQuery } = require("video_view");

/* ====================================================== */
/*                    Implementation                      */
/* ====================================================== */

async function getVideoViews(req, res, next) {
  const id = req.params.id;
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize, 10) : 10;
  const pageToken = req.query.pageToken || "";

  const { data, error } = await req.queryBus.handle(
    GetVideoViewsByVideoIdQuery.create({ videoId: id, pageSize, pageToken })
  );

  if (error) {
    switch (error.name) {
      case "InvalidIdError":
        return next(
          httpResponse.fromError(error, {
            status: HTTP_STATUS_CODES.BAD_REQUEST,
            message: "Invalid 'id' param provided",
            code: "invalid-video-id-param-error",
          })
        );
      case "InvalidPageSizeError":
        return next(
          httpResponse.fromError(error, {
            status: HTTP_STATUS_CODES.BAD_REQUEST,
            message: "Invalid 'pageSize' query param provided",
            code: "invalid-page-size-error",
          })
        );
      case "InvalidCursorError":
        throw httpResponse.fromError(error, {
          status: HTTP_STATUS_CODES.BAD_REQUEST,
          message: "Invalid 'pageToken' query param provided",
          code: "invalid-page-token-error",
        });
      default:
        return next(httpResponse.fromError(error));
    }
  }

  return res.status(200).json({
    data: data.videoViews,
    pageInfo: {
      hasNextPage: !!data.nextPageToken,
      hasPreviousPage: !!pageToken,
      startCursor: pageToken,
      endCursor: data.nextPageToken,
    },
  });
}

/* ====================================================== */
/*                      Public API                        */
/* ====================================================== */

module.exports = { getVideoViews };
