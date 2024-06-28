const _ = require("lodash");

module.exports = {
  convert,
  convertMany,
};

function convert(videoFeedback) {
  if (!videoFeedback) return;
  return {
    id: videoFeedback.getId().toValue(),
    videoId: videoFeedback.getVideoId().toValue(),
    isPositive: videoFeedback.getIsPositive().toValue(),
    occurredOn: videoFeedback.getOccurredOn().toValue(),
  };
}

function convertMany(videoFeedbacks = []) {
  return _.compact(videoFeedbacks.map(convert));
}
