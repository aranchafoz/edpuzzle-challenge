const {
  httpResponse,
  HTTP_STATUS_CODES,
} = require("api_gateway/http_response");

/* ====================================================== */
/*                      Application                       */
/* ====================================================== */

const { TrackVideoViewCommand } = require("video_view");

/* ====================================================== */
/*                    Implementation                      */
/* ====================================================== */

async function trackVideoView(req, res, next) {
  const id = req.params.id;

  const { data, error } = await req.commandBus.handle(
    TrackVideoViewCommand.create({ videoId: id })
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

/* ====================================================== */
/*                      Public API                        */
/* ====================================================== */

module.exports = { trackVideoView };
