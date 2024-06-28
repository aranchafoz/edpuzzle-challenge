const { VideoFeedback } = require("video_feedback/domain/aggregate/video_feedback");

async function giveVideoFeedbackUseCase(
  { videoId, isPositive },
  { videoFeedbackRepository, eventBus }
) {
  const videoFeedback = VideoFeedback.give({ videoId, isPositive });

  await videoFeedbackRepository.save(videoFeedback);
  await eventBus.publish(videoFeedback.pullDomainEvents());

  return videoFeedback;
}

module.exports = { giveVideoFeedbackUseCase };
