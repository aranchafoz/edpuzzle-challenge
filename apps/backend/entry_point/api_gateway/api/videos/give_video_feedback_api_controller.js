const {
  httpResponse,
  HTTP_STATUS_CODES,
} = require("api_gateway/http_response");

const { GiveVideoFeedbackCommand } = require("video_feedback");

async function giveVideoFeedback(req, res, next) {
  const id = req.params.id;
  const isPositive = req.body.isPositive;

  const { data, error } = await req.commandBus.handle(
    GiveVideoFeedbackCommand.create({ videoId: id, isPositive })
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

  return res.status(201).json({ data });
}

module.exports = { giveVideoFeedback };
