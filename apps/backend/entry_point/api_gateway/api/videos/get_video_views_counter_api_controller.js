// TBD
const {
  httpResponse,
  HTTP_STATUS_CODES,
} = require("api_gateway/http_response");

/* ====================================================== */
/*                      Application                       */
/* ====================================================== */

const { GetVideoViewsCounterByVideoIdQuery } = require("video_views_counter");

/* ====================================================== */
/*                    Implementation                      */
/* ====================================================== */

async function getVideoViewsCounter(req, res, next) {
  const id = req.params.id;

  const { data, error } = await req.queryBus.handle(
    GetVideoViewsCounterByVideoIdQuery.create({ videoId: id })
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
      default:
        return next(httpResponse.fromError(error));
    }
  }

  return res.status(200).json({ data });
}

/* ====================================================== */
/*                      Public API                        */
/* ====================================================== */

module.exports = { getVideoViewsCounter };
