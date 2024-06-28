// Commands
// --------

// Queries
// -------

const {
  GetAllVideosQuery,
} = require("./application/get_all_videos/get_all_videos_query_handler");
const {
  GetVideoByIdQuery,
} = require("./application/get_video_by_id/get_video_by_id_query_handler");

// Events
// ------

/* ====================================================== */
/*                      Public API                        */
/* ====================================================== */

module.exports = {
  // Queries
  GetAllVideosQuery,
  GetVideoByIdQuery,
  // Commands
  // Events
};
