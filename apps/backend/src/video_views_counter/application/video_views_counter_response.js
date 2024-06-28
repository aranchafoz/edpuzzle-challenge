const _ = require("lodash");

/* ====================================================== */
/*                      Public API                        */
/* ====================================================== */

module.exports = {
  convert,
  convertMany,
};

/* ====================================================== */
/*                    Implementation                      */
/* ====================================================== */

function convert(videoViewsCounter) {
  if (!videoViewsCounter) return;
  return {
    id: videoViewsCounter.getId().toValue(),
    videoId: videoViewsCounter.getVideoId().toValue(),
    counter: videoViewsCounter.getCounter().toValue(),
    updatedAt: videoViewsCounter.getUpdatedAt().toValue(),
  };
}

function convertMany(videoViewsCounters = []) {
  return _.compact(videoViewsCounters.map(convert));
}
