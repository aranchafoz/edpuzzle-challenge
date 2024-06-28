/* ====================================================== */
/*                         Domain                         */
/* ====================================================== */

const {
  VideoViewsCounter,
} = require("video_views_counter/domain/aggregate/video_views_counter");

/* ====================================================== */
/*                       Command                          */
/* ====================================================== */

async function incrementVideViewsCounterUseCase(
  { videoId },
  { videoViewsCounterRepository, eventBus }
) {
  let videoViewsCounter = await videoViewsCounterRepository.findByVideoId(
    videoId
  );

  if (!videoViewsCounter) {
    videoViewsCounter = VideoViewsCounter.increment({ videoId });
  } else {
    videoViewsCounter.increment();
  }

  await videoViewsCounterRepository.save(videoViewsCounter);
  await eventBus.publish(videoViewsCounter.pullDomainEvents());

  return videoViewsCounter;
}

/* ====================================================== */
/*                      Public API                        */
/* ====================================================== */

module.exports = { incrementVideViewsCounterUseCase };
