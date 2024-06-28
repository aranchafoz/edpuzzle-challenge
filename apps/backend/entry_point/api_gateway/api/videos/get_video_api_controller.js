const {
  httpResponse,
  HTTP_STATUS_CODES,
} = require("api_gateway/http_response");
const {
  populateQuestionsForVideo,
} = require("./services/video_question_populator");

/* ====================================================== */
/*                      Application                       */
/* ====================================================== */

const { GetVideoByIdQuery } = require("video");

/* ====================================================== */
/*                    Implementation                      */
/* ====================================================== */

async function getVideo(req, res, next) {
  const id = req.params.id;

  const { data: video, error: videoError } = await req.queryBus.handle(
    GetVideoByIdQuery.create({ id })
  );

  if (videoError) {
    switch (videoError.name) {
      case "InvalidIdError":
        return next(
          httpResponse.fromError(videoError, {
            status: HTTP_STATUS_CODES.NOT_FOUND,
            message: "No video with that 'id' was found",
            code: "video-not-found-error",
          })
        );
      default:
        return next(httpResponse.fromError(videoError));
    }
  }

  const { data: populatedVideo, error: questionsError } =
    await populateQuestionsForVideo(video, { queryBus: req.queryBus });

  if (questionsError) {
    return next(httpResponse.fromError(questionsError));
  }

  return res.status(200).json({ data: populatedVideo });
}

/* ====================================================== */
/*                      Public API                        */
/* ====================================================== */

module.exports = { getVideo };
