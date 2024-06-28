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

function convert(videoView) {
  if (!videoView) return;
  return {
    id: videoView.getId().toValue(),
    videoId: videoView.getVideoId().toValue(),
    occurredOn: videoView.getOccurredOn().toValue(),
  };
}

function convertMany(videoViews = []) {
  return _.compact(videoViews.map(convert));
}
