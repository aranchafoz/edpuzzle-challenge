/* ====================================================== */
/*                     Dependencies                       */
/* ====================================================== */

const {
  MongoDbVideoViewRepository,
} = require("./infrastructure/repositories/mongodb_video_view_repository");

/* ====================================================== */
/*                        Events                          */
/* ====================================================== */

/* ====================================================== */
/*                       Handlers                         */
/* ====================================================== */

// Command Handlers
// ----------------

const {
  TrackVideoViewCommand,
  handleTrackVideoViewCommand,
} = require("./application/track_video_view/track_video_view_command_handler");

// Query Handlers
// --------------

const {
  GetVideoViewsByVideoIdQuery,
  handleGetVideoViewsByVideoIdQuery,
} = require("./application/get_video_views_by_video_id/get_video_views_by_video_id_query_handler");

// Event Handlers
// --------------

/* ====================================================== */
/*                      Public API                        */
/* ====================================================== */

module.exports = {
  name: "video_view",
  // Handlers
  eventHandlers: {},
  commandHandlers: {
    [TrackVideoViewCommand.type]: handleTrackVideoViewCommand,
  },
  queryHandlers: {
    [GetVideoViewsByVideoIdQuery.type]: handleGetVideoViewsByVideoIdQuery,
  },
  // Dependencies
  createModuleDependencyResolver,
};

/* ====================================================== */
/*                     Implementation                     */
/* ====================================================== */

function createModuleDependencyResolver({ mongoConnection, env }) {
  const videoViewRepository = new MongoDbVideoViewRepository({
    db: mongoConnection,
    env,
  });
  return () => ({ videoViewRepository });
}
