/* ====================================================== */
/*                         Domain                         */
/* ====================================================== */

const { VideoView } = require("video_view/domain/aggregate/video_view");

/* ====================================================== */
/*                       Command                          */
/* ====================================================== */

async function trackVideoViewUseCase(
  { videoId },
  { videoViewRepository, eventBus }
) {
  const videoView = VideoView.track({ videoId });

  await videoViewRepository.save(videoView);
  await eventBus.publish(videoView.pullDomainEvents());

  return videoView;
}

/* ====================================================== */
/*                      Public API                        */
/* ====================================================== */

module.exports = { trackVideoViewUseCase };
