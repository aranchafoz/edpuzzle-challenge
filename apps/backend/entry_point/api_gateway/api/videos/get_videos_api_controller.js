const {
  httpResponse,
  HTTP_STATUS_CODES,
} = require("api_gateway/http_response");
const {
  populateQuestionsForVideos,
} = require("./services/video_question_populator");

/* ====================================================== */
/*                      Application                       */
/* ====================================================== */

const { GetAllVideosQuery } = require("video");

/* ====================================================== */
/*                    Implementation                      */
/* ====================================================== */

async function getVideos(req, res, next) {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize, 10) : 10;
  const pageToken = req.query.pageToken || "";

  const { data, error } = await req.queryBus.handle(
    GetAllVideosQuery.create({ pageSize, pageToken })
  );

  if (error) {
    switch (error.name) {
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

  const populatedVideos = await populateQuestionsForVideos(data.videos, {
    queryBus: req.queryBus,
  });

  return res.status(200).json({
    data: populatedVideos,
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

module.exports = { getVideos };
