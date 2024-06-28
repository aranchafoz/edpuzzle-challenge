const {
  incrementVideoFeedbackCounterUseCase,
} = require("./increment_video_feedback_counter_use_case");
const VideoFeedbackCounterResponse = require("video_feedback_counter/application/video_feedback_counter_response");
const ErrorResponse = require("shared/application/error_response");

const { Id } = require("shared/domain/value_objects/id");

async function handleIncrementVideoFeedbackCounterOnVideoFeedbackGivenEventHandler(
  event,
  dependencies
) {
  try {
    const videoFeedbackCounter = await incrementVideoFeedbackCounterUseCase(
      { videoId: new Id(event.getAttributes().videoId), isPositive: event.getAttributes().isPositive },
      dependencies
    );
    return {
      data: VideoFeedbackCounterResponse.convert(videoFeedbackCounter),
      error: null,
    };
  } catch (err) {
    return { data: undefined, error: ErrorResponse.convert(err) };
  }
}

module.exports = {
  handleIncrementVideoFeedbackCounterOnVideoFeedbackGivenEventHandler,
};
