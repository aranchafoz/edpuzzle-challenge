const { Command } = require("shared/action");
const { giveVideoFeedbackUseCase } = require("./give_video_feedback_use_case");
const VideoFeedbackResponse = require("video_feedback/application/video_feedback_response");
const ErrorResponse = require("shared/application/error_response");

const { Id } = require("shared/domain/value_objects/id");

class GiveVideoFeedbackCommand extends Command {
  static get type() {
    return "video_feedback.1.command.give_video_feedback";
  }
  static create({ videoId, isPositive }) {
    return new this({
      type: this.type,
      attributes: { videoId, isPositive },
      meta: {},
    });
  }
}

async function handleGiveVideoFeedbackCommand(query, dependencies) {
  try {
    const videoFeedback = await giveVideoFeedbackUseCase(
      { 
        videoId: new Id(query.getAttributes().videoId), 
        isPositive: new Boolean(query.getAttributes().isPositive)
      },
      dependencies
    );
    return { data: VideoFeedbackResponse.convert(videoFeedback), error: null };
  } catch (err) {
    return { data: undefined, error: ErrorResponse.convert(err) };
  }
}

module.exports = {
  GiveVideoFeedbackCommand,
  handleGiveVideoFeedbackCommand,
};
