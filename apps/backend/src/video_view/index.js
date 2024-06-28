// Commands
// --------

const {
  TrackVideoViewCommand,
} = require("./application/track_video_view/track_video_view_command_handler");

// Queries
// -------

const {
  GetVideoViewsByVideoIdQuery,
} = require("./application/get_video_views_by_video_id/get_video_views_by_video_id_query_handler");

// Events
// ------

const { VideoViewTrackedEvent } = require("./domain/events/video_view_tracked");

/* ====================================================== */
/*                      Public API                        */
/* ====================================================== */

module.exports = {
  // Queries
  GetVideoViewsByVideoIdQuery,
  // Commands
  TrackVideoViewCommand,
  // Events
  VideoViewTrackedEvent,
};
