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

function convert(video) {
  if (!video) return;
  return {
    id: video.getId().toValue(),
    src: video.getSrc(),
    title: video.getTitle().toValue(),
    author: video.getAuthor().toValue(),
    thumbnailUrl: video.getThumbnailUrl().toValue(),
    questions: video.getQuestions().toValue(),
  };
}

function convertMany(videos = []) {
  return _.compact(videos.map(convert));
}
