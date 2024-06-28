const _ = require("lodash");
const {
  MongoDbEventStore,
} = require("shared/infrastructure/event_store/mongodb_event_store");
const {
  createQueryBus,
  createEventBus,
  createCommandBus,
} = require("shared/infrastructure/buses/buses");

/* ====================================================== */
/*                      Public API                        */
/* ====================================================== */

module.exports = {
  createContainer,
  createQueryBus,
  createEventBus,
  createCommandBus,
};

/* ====================================================== */
/*                     Implementation                     */
/* ====================================================== */

function createContainer({
  modules,
  dependencies: { env, mongoConnection, logger },
}) {
  const eventStore = new MongoDbEventStore({ db: mongoConnection, env });

  const container = {
    moduleDependencyResolvers: {},
    registeredModuleDependencies: {},
    eventHandlers: {},
    commandHandlers: {},
    queryHandlers: {},
  };

  _.each(modules, (module) => {
    const moduleDependencyResolver = module.createModuleDependencyResolver({
      mongoConnection,
      env,
    });
    container.moduleDependencyResolvers[module.name] = () => {
      const registeredModuleDependencies =
        container.registeredModuleDependencies[module.name] || {};
      return { ...moduleDependencyResolver(), ...registeredModuleDependencies };
    };

    _.each(module.eventHandlers, (handler, eventType) => {
      const currentHandlers = container.eventHandlers[eventType] || [];
      container.eventHandlers[eventType] = [
        ...currentHandlers,
        {
          moduleName: module.name,
          handlerName: `${eventType}.handler`,
          handler: (event, applicationDeps) => {
            return handler(event, {
              ...container.moduleDependencyResolvers[module.name](),
              ...applicationDeps,
            });
          },
        },
      ];
    });

    _.each(module.commandHandlers, (handler, commandType) => {
      if (!_.isEmpty(container.commandHandlers[commandType])) {
        throw new Error(`"${commandType}" has more than one handler`);
      }
      container.commandHandlers[commandType] = {
        moduleName: module.name,
        handlerName: `${commandType}.handler`,
        handler: (command, applicationDeps) => {
          return handler(command, {
            ...container.moduleDependencyResolvers[module.name](),
            ...applicationDeps,
          });
        },
      };
    });

    _.each(module.queryHandlers, (handler, queryType) => {
      if (!_.isEmpty(container.queryHandlers[queryType])) {
        throw new Error(`"${queryType}" has more than one handler`);
      }
      container.queryHandlers[queryType] = {
        moduleName: module.name,
        handlerName: `${queryType}.handler`,
        handler: (query, applicationDeps) => {
          return handler(query, {
            ...container.moduleDependencyResolvers[module.name](),
            ...applicationDeps,
          });
        },
      };
    });
  });

  // Buses
  // -----

  const queryBus = createQueryBus({
    handlers: container.queryHandlers,
    logger,
  });

  const eventBus = createEventBus({
    handlers: container.eventHandlers,
    queryBus,
    eventStore,
    logger,
  });

  const commandBus = createCommandBus({
    handlers: container.commandHandlers,
    queryBus,
    eventBus,
    logger,
  });

  return {
    commandBus,
    queryBus,
    eventBus,
    resolve: (moduleDependencyName) => {
      const [moduleName, dependencyName] = _.split(
        moduleDependencyName,
        ".",
        2
      );
      const resolvedDependency =
        container.moduleDependencyResolvers[moduleName]()[dependencyName];
      return resolvedDependency;
    },
    register: (moduleDependencyName, dependency) => {
      const [moduleName, dependencyName] = _.split(
        moduleDependencyName,
        ".",
        2
      );
      container.registeredModuleDependencies[moduleName] = {
        ...(container.registeredModuleDependencies[moduleName] || {}),
        [dependencyName]: dependency,
      };
    },
    unregister: (moduleDependencyName) => {
      const [moduleName, dependencyName] = _.split(
        moduleDependencyName,
        ".",
        2
      );
      delete container.registeredModuleDependencies[moduleName][dependencyName];
    },
  };
}
