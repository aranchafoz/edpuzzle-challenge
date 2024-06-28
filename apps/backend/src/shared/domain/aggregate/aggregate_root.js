const _ = require("lodash");
const { AggregateError } = require("shared/domain/errors/errors");

/* ====================================================== */
/*                    Value Objects                       */
/* ====================================================== */

const { Id } = require("shared/domain/value_objects/id");

/* ====================================================== */
/*                    Implementation                      */
/* ====================================================== */

class AggregateRoot {
  constructor(attributes, { isNew = true, events = [] } = {}) {
    this.isAggregateRoot = true;

    this.isNew = isNew;
    this.isDeleted = false;

    // Attributes
    this._attributes = {};
    _.forEach(attributes, (value, key) => {
      if (value) {
        if (!_.isArray(value) && !value.isValueObject) {
          throw new Error(
            `${key} with value: '${value}' is not a Value Object`
          );
        }
        if (_.isArray(value) && _.some(value, (v) => !v.isValueObject)) {
          throw new Error("Array not full of Value Objects");
        }
      }
      if (key === "id") {
        this._attributes[key] = value || Id.random();
      } else {
        this._attributes[key] = value;
      }
    });
    this._initialAttributes = { ...this._attributes };

    // Events
    this._events = events;
  }
  getId() {
    return this._id;
  }

  // Methods
  // -------

  deepEquals(data) {
    return _.isEqual(
      data.isAggregateRoot ? data.attributes() : data,
      this.attributes()
    );
  }
  equals(entity) {
    return _.isEqual(entity.getId().toValue(), this.getId().toValue());
  }
  attributes() {
    return _.mapValues(this._attributes, (value) => value.toValue());
  }

  // Repository utils
  // ----------------

  changedAttributes() {
    return _.transform(this._attributes, (result, value, key) => {
      if (this.isNew) {
        result[key] = true;
      } else if (_.isArray(value)) {
        const differentSize =
          _.size(value) !== _.size(this._initialAttributes[key]);
        if (differentSize) return (result[key] = true);
        const differentValues = _.some(
          value,
          (_value, n) => !_value.equals(this._initialAttributes[key][n])
        );
        if (differentValues) return (result[key] = true);
      } else if (!value.equals(this._initialAttributes[key])) {
        result[key] = true;
      } else {
        result[key] = false;
      }
    });
  }
  flushChangedAttributes() {
    this.isNew = false;
    this._initialAttributes = { ...this._attributes };
  }

  // Events
  // ------

  record(event) {
    this._events.push(event);
  }
  pullDomainEvents() {
    const events = this._events;
    this._events = [];
    return events;
  }
}

/* ====================================================== */
/*                      Public API                        */
/* ====================================================== */

module.exports = { AggregateRoot, AggregateError };
