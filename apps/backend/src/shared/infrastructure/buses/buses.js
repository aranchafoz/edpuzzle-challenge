const EventEmitter2 = require("eventemitter2");
const _ = require("lodash");
const { Event } = require("shared/action");
const {
  applyMiddleware,
  errorBusMiddleware,
  loggingBusMiddleware,
} = require("shared/infrastructure/buses/middleware");

/* ====================================================== */
/*                    Implementation                      */
/* ====================================================== */

function createQueryBus({ handlers, logger }) {
  const queryHandlers = {};
  _.forEach(handlers, ({ moduleName, handlerName, handler }, queryType) => {
    queryHandlers[queryType] = (query, mockedDependencies = {}) => {
      return applyMiddleware(handler, [
        loggingBusMiddleware({ moduleName, handlerName, logger }),
        errorBusMiddleware(),
        (next) => (action, args) => {
          const correlationId = action.getMetadata().correlationId;
          const causationId = action.getId();

          return next(action, {
            ...args,
            logger,
            queryBus: injectQueryBus({
              queryBus: mockedDependencies.queryBus || queryBus,
              metadata: { correlationId, causationId },
            }),
          });
        },
      ])(query);
    };
  });

  const queryBus = new SyncInMemoryQueryAndCommandBus({
    handlers: queryHandlers,
  });
  return queryBus;
}

function createEventBus({ handlers, eventStore, queryBus, logger }) {
  const eventBus = new SyncInMemoryEventBus({ eventStore });

  _.forEach(handlers, (eventHandlers, eventType) => {
    _.forEach(eventHandlers, ({ moduleName, handlerName, handler }) => {
      const _eventHandler = (event, mockedDependencies = {}) => {
        return applyMiddleware(handler, [
          loggingBusMiddleware({ moduleName, handlerName, logger }),
          errorBusMiddleware(),
          (next) => (action, args) => {
            const correlationId = action.getMetadata().correlationId;
            const causationId = action.getId();

            return next(action, {
              ...args,
              logger,
              queryBus: injectQueryBus({
                queryBus: mockedDependencies.queryBus || queryBus,
                metadata: { correlationId, causationId },
              }),
              eventBus: injectEventBus({
                eventBus: mockedDependencies.eventBus || eventBus,
                metadata: { correlationId, causationId },
              }),
            });
          },
        ])(event);
      };

      eventBus.subscribe(eventType, _eventHandler);
    });
  });
  return eventBus;
}

function createCommandBus({ handlers, queryBus, eventBus, logger }) {
  const commandHandlers = {};

  _.forEach(handlers, ({ moduleName, handlerName, handler }, commandType) => {
    commandHandlers[commandType] = (command, mockedDependencies = {}) => {
      return applyMiddleware(handler, [
        loggingBusMiddleware({ moduleName, handlerName, logger }),
        errorBusMiddleware(),
        (next) => (action, args) => {
          const correlationId = action.getMetadata().correlationId;
          const causationId = action.getId();

          return next(action, {
            ...args,
            logger,
            queryBus: injectQueryBus({
              queryBus: mockedDependencies.queryBus || queryBus,
              metadata: { correlationId, causationId },
            }),
            eventBus: injectEventBus({
              eventBus: mockedDependencies.eventBus || eventBus,
              metadata: { correlationId, causationId },
            }),
          });
        },
      ])(command);
    };
  });

  const commandBus = new SyncInMemoryQueryAndCommandBus({
    handlers: commandHandlers,
  });
  return commandBus;
}

/* ====================================================== */
/*                      Public API                        */
/* ====================================================== */

module.exports = {
  createQueryBus,
  createEventBus,
  createCommandBus,
};

/* ====================================================== */
/*                       Helpers                          */
/* ====================================================== */

const injectQueryBus = ({ metadata, queryBus }) => {
  return {
    handle(_useCaseQuery) {
      _useCaseQuery.addMetadata(metadata);
      return queryBus.handle(_useCaseQuery);
    },
  };
};

const injectEventBus = ({ metadata, eventBus }) => {
  return {
    publish(events, { sync = false } = {}) {
      events.forEach((event) => event.addMetadata(metadata));
      return eventBus.publish(events, { sync });
    },
  };
};

class SyncInMemoryQueryAndCommandBus {
  constructor({ handlers }) {
    this._handlers = handlers;
  }
  async handle(commandOrQuery, mockedDependencies = {}) {
    const handler = this._handlers[commandOrQuery.getType()];
    if (!handler) {
      throw new Error(`Bus | No Handler for "${commandOrQuery.getType()}"`);
    }
    return handler(commandOrQuery, mockedDependencies);
  }
}

class SyncInMemoryEventBus {
  constructor({ eventStore }) {
    this._eventStore = eventStore;
    this._emitter = new EventEmitter2({ wildcard: true });
  }

  subscribe(eventType, eventHandler) {
    const _eventHandler = async (event, mockedDependencies) => {
      const _event = new Event({
        id: event.getId(),
        type: event.getType(),
        occurredOn: event.getOccurredOn(),
        attributes: event.getAttributes(),
        meta: event.getMetadata(),
      });
      await eventHandler(_event, mockedDependencies);
      return;
    };

    this._emitter.on(eventType, _eventHandler, { async: true });
    return Promise.resolve();
  }

  _publish(event, mockedDependencies) {
    return this._emitter.emitAsync(event.getType(), event, mockedDependencies);
  }

  async publish(events = [], { sync = false, ...mockedDependencies } = {}) {
    await this._eventStore.save(events);

    _.each(events, (event) => event.addMetadata({ sync: !!sync }));

    if (sync) {
      return Promise.allSettled(
        events.map((event) => this._publish(event, mockedDependencies))
      );
    }

    events.forEach((event) => {
      this._publish(event, mockedDependencies);
    });
    return Promise.resolve();
  }
}
