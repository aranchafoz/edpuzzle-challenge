const VideoModule = require("video/module");
const VideoViewModule = require("video_view/module");
const VideoFeedbackModule = require("video_feedback/module");
const VideoFeedbackCounter = require("video_feedback_counter/module");
const QuestionModule = require("question/module");
const VideoViewsCounter = require("video_views_counter/module");

/* ====================================================== */
/*                      Public API                        */
/* ====================================================== */

module.exports = {
  modules: [VideoModule, QuestionModule, VideoViewModule, VideoFeedbackModule, VideoFeedbackCounter, VideoViewsCounter],
};
