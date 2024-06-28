const _ = require("lodash");
const { ObjectId } = require("mongodb");
const { Event } = require("shared/action");

/* ====================================================== */
/*                    Implementation                      */
/* ====================================================== */

class MongoDbEventStore {
  constructor({ db, env }) {
    this.env = env;
    this.collection = db.collection("events");
  }

  // Read
  // ----

  async findById(id) {
    const databaseEvent = await this.collection.findOne({ publicId: id });
    return toEntity(databaseEvent);
  }

  // Write
  // -----

  async save(events) {
    if (_.isEmpty(events)) return events;
    await this.collection.insertMany(
      _.map(events, (event) => toDatabase(event))
    );
    return events;
  }
}

/* ====================================================== */
/*                      Public API                        */
/* ====================================================== */

module.exports = { MongoDbEventStore };

/* ====================================================== */
/*                      Data Mapper                       */
/* ====================================================== */

function toEntity(data) {
  if (_.isEmpty(data)) return;
  const { publicId, ...rest } = data;
  return new Event({ id: publicId, ...rest });
}

function toDatabase(event) {
  if (_.isEmpty(event)) return;
  return {
    publicId: event.getId(),
    type: event.getType(),
    occurredOn: event.getOccurredOn(),
    attributes: event.getAttributes(),
    meta: event.getMetadata(),
  };
}
