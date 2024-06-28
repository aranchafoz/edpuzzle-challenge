const {
  httpResponse,
  HTTP_STATUS_CODES,
} = require("api_gateway/http_response");

const { GetVideoFeedbackCounterByVideoIdQuery } = require("video_feedback_counter");

async function getVideoFeedbackCounter(req, res, next) {
  const id = req.params.id;

  const { data, error } = await req.queryBus.handle(
    GetVideoFeedbackCounterByVideoIdQuery.create({ videoId: id })
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

module.exports = { getVideoFeedbackCounter };
