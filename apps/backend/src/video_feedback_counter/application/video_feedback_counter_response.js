const _ = require("lodash");

module.exports = {
  convert,
  convertMany,
};

function convert(videoFeedbackCounter) {
  if (!videoFeedbackCounter) return;
  return {
    id: videoFeedbackCounter.getId().toValue(),
    videoId: videoFeedbackCounter.getVideoId().toValue(),
    counter: videoFeedbackCounter.getCounter().toValue(),
    likeCounter: videoFeedbackCounter.getLikeCounter().toValue(),
    dislikeCounter: videoFeedbackCounter.getDislikeCounter().toValue(),
    updatedAt: videoFeedbackCounter.getUpdatedAt().toValue(),
  };
}

function convertMany(videoFeedbackCounters = []) {
  return _.compact(videoFeedbackCounters.map(convert));
}
