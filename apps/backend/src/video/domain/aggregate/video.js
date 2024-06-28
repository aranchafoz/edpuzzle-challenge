const { AggregateRoot } = require("shared/domain/aggregate/aggregate_root");

/* ====================================================== */
/*                     Domain Errors                      */
/* ====================================================== */

/* ====================================================== */
/*                        Events                          */
/* ====================================================== */

/* ====================================================== */
/*                    Value Objects                       */
/* ====================================================== */

const { Id } = require("shared/domain/value_objects/id");
const { VideoId } = require("video/domain/value_objects/video_id");
const { VideoAuthor } = require("video/domain/value_objects/video_author");
const {
  VideoQuestions,
} = require("video/domain/value_objects/video_questions");
const {
  VideoThumbnailUrl,
} = require("video/domain/value_objects/video_thumbnail_url");

/* ====================================================== */
/*                    Implementation                      */
/* ====================================================== */

class Video extends AggregateRoot {
  constructor({ id, videoId, title, author, questions }, opts) {
    super({ id, videoId, title, author, questions }, opts);
  }

  // Named constructors
  // ------------------

  static random(
    {
      id = Id.random(),
      videoId = VideoId.random(),
      title = VideoTitle.random(),
      author = VideoAuthor.random(),
      questions = VideoQuestions.random(),
    } = {},
    opts
  ) {
    return new this({ id, videoId, title, author, questions }, opts);
  }

  // Getters
  // -------

  getId() {
    return this._attributes.id;
  }
  getVideoId() {
    return this._attributes.videoId;
  }
  getSrc() {
    return `https://www.youtube.com/embed/${this._attributes.videoId.toValue()}`;
  }
  getTitle() {
    return this._attributes.title;
  }
  getAuthor() {
    return this._attributes.author;
  }
  getQuestions() {
    return this._attributes.questions;
  }
  getThumbnailUrl() {
    return new VideoThumbnailUrl(
      `https://img.youtube.com/vi/${this._attributes.videoId.toValue()}/mqdefault.jpg`
    );
  }

  // Methods
  // -------
}

/* ====================================================== */
/*                      Public API                        */
/* ====================================================== */

module.exports = { Video };
