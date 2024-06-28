const assert = require("assert");
const _ = require("lodash");
const uuid = require("shared/infrastructure/uuid");

/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

const ACTION_TYPES = {
  COMMAND: "command",
  QUERY: "query",
  EVENT: "event",
};

class Action {
  constructor({
    actionType,
    id = uuid.v4(),
    type = "",
    occurredOn = Date.now(),
    attributes = {},
    meta = {},
  }) {
    assert(type, "Missing type dependency");
    if (actionType === ACTION_TYPES.EVENT && !attributes.id) {
      throw new Error("Events need to have attributes.id");
    }

    const typeStringParts = _.split(type, ".");
    if (typeStringParts[2] !== actionType) {
      throw new Error(
        `${_.capitalize(actionType)}s "type" must include ${actionType}`
      );
    }
    if (typeStringParts.length !== 4) {
      throw new Error(
        `${_.capitalize(
          actionType
        )}s "type" must follow the pattern "{MODULE}.{VERSION_NUMBER}.${actionType}.{${_.uppercase(
          actionType
        )}_NAME}"`
      );
    }

    this.actionType = actionType;
    this.data = {
      id,
      type,
      occurredOn,
      attributes,
      meta,
    };
  }

  // Methods
  // -------

  isCommand() {
    return this.actionType === ACTION_TYPES.COMMAND;
  }
  isQuery() {
    return this.actionType === ACTION_TYPES.QUERY;
  }
  isEvent() {
    return this.actionType === ACTION_TYPES.EVENT;
  }
  format() {
    return {
      id: this.getId(),
      type: this.getType(),
      occurredOn: this.getOccurredOn(),
      attributes: this.getAttributes(),
      meta: this.getMetadata(),
    };
  }
  toString() {
    try {
      return JSON.stringify(this.format());
    } catch (err) {
      return "";
    }
  }

  // Getters
  // -------

  getId() {
    return this.data.id;
  }
  getType() {
    return this.data.type;
  }
  getOccurredOn() {
    return this.data.occurredOn;
  }
  getAttributes() {
    return this.data.attributes;
  }
  getMetadata() {
    return this.data.meta;
  }
  addMetadata(data) {
    this.data.meta = {
      ...this.data.meta,
      ...data,
    };
  }
}

class Query extends Action {
  constructor(data) {
    super({ actionType: ACTION_TYPES.QUERY, ...data });
  }
}

class Command extends Action {
  constructor(data) {
    super({ actionType: ACTION_TYPES.COMMAND, ...data });
  }
}

class Event extends Action {
  constructor(data) {
    super({ actionType: ACTION_TYPES.EVENT, ...data });
  }
}

/* ====================================================== */
/*                      Public API                        */
/* ====================================================== */

module.exports = {
  Command,
  Query,
  Event,
};
