const {
  MongoDbVideoFeedbackCounterRepository,
} = require("./infrastructure/repositories/mongodb_video_feedback_counter_repository");

const { VideoFeedbackGivenEvent } = require("video_feedback");


const {
  GetVideoFeedbackCounterByVideoIdQuery,
  handleGetVideoFeedbackCounterByVideoIdQuery,
} = require("./application/get_video_feedback_counter_by_video_id/get_video_feedback_counter_by_video_id_query_handler");


const {
  handleIncrementVideoFeedbackCounterOnVideoFeedbackGivenEventHandler,
} = require("./application/increment_video_feedback_counter/increment_video_feedback_counter_on_video_feedback_given_event_handler");

module.exports = {
  name: "video_feedback_counter",
  eventHandlers: {
    [VideoFeedbackGivenEvent.type]:
      handleIncrementVideoFeedbackCounterOnVideoFeedbackGivenEventHandler,
  },
  commandHandlers: {},
  queryHandlers: {
    [GetVideoFeedbackCounterByVideoIdQuery.type]:
      handleGetVideoFeedbackCounterByVideoIdQuery,
  },
  createModuleDependencyResolver,
};

function createModuleDependencyResolver({ mongoConnection, env }) {
  const videoFeedbackCounterRepository = new MongoDbVideoFeedbackCounterRepository({
    db: mongoConnection,
    env,
  });
  return () => ({ videoFeedbackCounterRepository });
}
