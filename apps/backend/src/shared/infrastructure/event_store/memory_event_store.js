const _ = require("lodash");

/* ====================================================== */
/*                    Implementation                      */
/* ====================================================== */

class MemoryEventStore {
  constructor() {
    this._index = 1;
    this._data = [];
  }

  // Read
  // ----

  async findById(id) {
    const result = _.find(this._data, ({ event }) => event.getId() === id);
    return result ? result.event : undefined;
  }

  // Write
  // -----

  async save(events) {
    return events.map((event) => {
      const index = this._index + 1;
      event.isNew = false;
      this._index = index;
      this._data.push({ index: this._index, event });
      return event;
    });
  }
}

/* ====================================================== */
/*                      Public API                        */
/* ====================================================== */

module.exports = { MemoryEventStore };
