const {
  VideoFeedbackCounter,
} = require("video_feedback_counter/domain/aggregate/video_feedback_counter");

async function incrementVideoFeedbackCounterUseCase(
  { videoId, isPositive },
  { videoFeedbackCounterRepository, eventBus }
) {
  let videoFeedbackCounter = await videoFeedbackCounterRepository.findByVideoId(
    videoId
  );

  if (!videoFeedbackCounter) {
    if (isPositive) {
      videoFeedbackCounter = VideoFeedbackCounter.incrementLikes({ videoId });
    } else {
      videoFeedbackCounter = VideoFeedbackCounter.incrementDislikes({ videoId });
    }
  } else {
    if (isPositive) {
      videoFeedbackCounter.incrementLikes();
    } else {
      videoFeedbackCounter.incrementDislikes();
    }
  }

  await videoFeedbackCounterRepository.save(videoFeedbackCounter);
  await eventBus.publish(videoFeedbackCounter.pullDomainEvents());

  return videoFeedbackCounter;
}

module.exports = { incrementVideoFeedbackCounterUseCase };
