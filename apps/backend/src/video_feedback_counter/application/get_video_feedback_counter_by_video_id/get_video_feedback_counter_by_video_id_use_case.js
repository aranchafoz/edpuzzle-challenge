const {
  VideoFeedbackCounter,
} = require("video_feedback_counter/domain/aggregate/video_feedback_counter");
const { Id } = require("shared/domain/value_objects/id");
const { Counter } = require("video_feedback_counter/domain/value_objects/counter");
const { UTCTimestamp } = require("shared/domain/value_objects/utc_timestamp");

async function getVideoFeedbackCounterByVideoIdUseCase(
  { videoId },
  { videoFeedbackCounterRepository }
) {
  const videoFeedbackCounter = await videoFeedbackCounterRepository.findByVideoId(
    videoId
  );
  return (
    videoFeedbackCounter ||
    new VideoFeedbackCounter({
      id: Id.random(),
      videoId,
      counter: Counter.zero(),
      likeCounter: Counter.zero(),
      dislikeCounter: Counter.zero(),
      updatedAt: UTCTimestamp.now(),
    })
  );
}

module.exports = { getVideoFeedbackCounterByVideoIdUseCase };
