/* ====================================================== */
/*                     Dependencies                       */
/* ====================================================== */

const {
  MongoDbVideoRepository,
} = require("./infrastructure/repositories/mongodb_video_repository");

/* ====================================================== */
/*                        Events                          */
/* ====================================================== */

/* ====================================================== */
/*                       Handlers                         */
/* ====================================================== */

// Command Handlers
// ----------------

// Query Handlers
// --------------

const {
  handleGetAllVideosQuery,
  GetAllVideosQuery,
} = require("./application/get_all_videos/get_all_videos_query_handler");
const {
  handleGetVideoByIdQuery,
  GetVideoByIdQuery,
} = require("./application/get_video_by_id/get_video_by_id_query_handler");

// Event Handlers
// --------------

/* ====================================================== */
/*                      Public API                        */
/* ====================================================== */

module.exports = {
  name: "video",
  // Handlers
  eventHandlers: {},
  commandHandlers: {},
  queryHandlers: {
    [GetAllVideosQuery.type]: handleGetAllVideosQuery,
    [GetVideoByIdQuery.type]: handleGetVideoByIdQuery,
  },
  // Dependencies
  createModuleDependencyResolver,
};

/* ====================================================== */
/*                     Implementation                     */
/* ====================================================== */

function createModuleDependencyResolver({ mongoConnection, env }) {
  const videoRepository = new MongoDbVideoRepository({
    db: mongoConnection,
    env,
  });
  return () => ({ videoRepository });
}
