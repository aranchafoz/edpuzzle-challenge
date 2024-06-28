const { Command } = require("shared/action");
const { trackVideoViewUseCase } = require("./track_video_view_use_case");
const VideoViewResponse = require("video_view/application/video_view_response");
const ErrorResponse = require("shared/application/error_response");

/* ====================================================== */
/*                         Domain                         */
/* ====================================================== */

const { Id } = require("shared/domain/value_objects/id");

/* ====================================================== */
/*                          Query                         */
/* ====================================================== */

class TrackVideoViewCommand extends Command {
  static get type() {
    return "video_view.1.command.track_video_view";
  }
  static create({ videoId }) {
    return new this({
      type: this.type,
      attributes: { videoId },
      meta: {},
    });
  }
}

/* ====================================================== */
/*                        Handler                         */
/* ====================================================== */

async function handleTrackVideoViewCommand(query, dependencies) {
  try {
    const videoView = await trackVideoViewUseCase(
      { videoId: new Id(query.getAttributes().videoId) },
      dependencies
    );
    return { data: VideoViewResponse.convert(videoView), error: null };
  } catch (err) {
    return { data: undefined, error: ErrorResponse.convert(err) };
  }
}

/* ====================================================== */
/*                      Public API                        */
/* ====================================================== */

module.exports = {
  TrackVideoViewCommand,
  handleTrackVideoViewCommand,
};
