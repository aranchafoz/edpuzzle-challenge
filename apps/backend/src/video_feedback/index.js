const {
  GiveVideoFeedbackCommand,
} = require("./application/give_video_feedback/give_video_feedback_command_handler");

const { VideoFeedbackGivenEvent } = require("./domain/events/video_feedback_given");

module.exports = {
  GiveVideoFeedbackCommand,
  VideoFeedbackGivenEvent,
};
