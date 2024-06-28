const {
  MongoDbVideoFeedbackRepository,
} = require("./infrastructure/repositories/mongodb_video_feedback_repository");

const {
  GiveVideoFeedbackCommand,
  handleGiveVideoFeedbackCommand,
} = require("./application/give_video_feedback/give_video_feedback_command_handler");

module.exports = {
  name: "video_feedback",

  eventHandlers: {},
  commandHandlers: {
    [GiveVideoFeedbackCommand.type]: handleGiveVideoFeedbackCommand,
  },
  queryHandlers: {},

  createModuleDependencyResolver,
};

function createModuleDependencyResolver({ mongoConnection, env }) {
  const videoFeedbackRepository = new MongoDbVideoFeedbackRepository({
    db: mongoConnection,
    env,
  });
  return () => ({ videoFeedbackRepository });
}
