/* ====================================================== */
/*                     Dependencies                       */
/* ====================================================== */

const {
  MongoDbVideoViewsCounterRepository,
} = require("./infrastructure/repositories/mongodb_video_views_counter_repository");

/* ====================================================== */
/*                        Events                          */
/* ====================================================== */

const { VideoViewTrackedEvent } = require("video_view");

/* ====================================================== */
/*                       Handlers                         */
/* ====================================================== */

// Command Handlers
// ----------------

// Query Handlers
// --------------

const {
  GetVideoViewsCounterByVideoIdQuery,
  handleGetVideoViewsCounterByVideoIdQuery,
} = require("./application/get_video_views_counter_by_video_id/get_video_views_counter_by_video_id_query_handler");

// Event Handlers
// --------------

const {
  handleIncrementVideoViewsCounterOnVideoViewsTrackedEventHandler,
} = require("./application/increment_video_view_counter/increment_video_view_counter_on_video_views_tracked_event_handler");

/* ====================================================== */
/*                      Public API                        */
/* ====================================================== */

module.exports = {
  name: "video_views_counter",
  // Handlers
  eventHandlers: {
    [VideoViewTrackedEvent.type]:
      handleIncrementVideoViewsCounterOnVideoViewsTrackedEventHandler,
  },
  commandHandlers: {},
  queryHandlers: {
    [GetVideoViewsCounterByVideoIdQuery.type]:
      handleGetVideoViewsCounterByVideoIdQuery,
  },
  // Dependencies
  createModuleDependencyResolver,
};

/* ====================================================== */
/*                     Implementation                     */
/* ====================================================== */

function createModuleDependencyResolver({ mongoConnection, env }) {
  const videoViewsCounterRepository = new MongoDbVideoViewsCounterRepository({
    db: mongoConnection,
    env,
  });
  return () => ({ videoViewsCounterRepository });
}
