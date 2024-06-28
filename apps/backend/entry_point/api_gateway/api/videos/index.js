const router = require("express").Router();

/* ====================================================== */
/*                       Middleware                       */
/* ====================================================== */

/* ====================================================== */
/*                        Handlers                        */
/* ====================================================== */

const { getVideos } = require("./get_videos_api_controller");
const { getVideo } = require("./get_video_api_controller");
const { giveVideoFeedback } = require("./give_video_feedback_api_controller");
const {
  getVideoFeedbackCounter,
} = require("./get_video_feedback_counter_api_controller");
const { trackVideoView } = require("./track_video_view_api_controller");
const { getVideoViews } = require("./get_video_views_api_controller");
const {
  getVideoViewsCounter,
} = require("./get_video_views_counter_api_controller");

/* ====================================================== */
/*                    Implementation                      */
/* ====================================================== */

router.get("/", getVideos);
router.get("/:id", getVideo);
router.post("/:id/feedback", giveVideoFeedback);
router.get("/:id/feedback_counter", getVideoFeedbackCounter);
router.post("/:id/views", trackVideoView);
router.get("/:id/views", getVideoViews);
router.get("/:id/views_counter", getVideoViewsCounter);

/* ====================================================== */
/*                      Public API                        */
/* ====================================================== */

module.exports = router;
