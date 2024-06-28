const Joi = require("joi");

/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string().allow("production", "development", "test").required(),
  PORT: Joi.number().required(),
  // MONGODB
  MONGO_URL: Joi.string().required(),
  MONGO_DATABASE_NAME: Joi.string().required(),
  // LOGGING
  LOGGING_API_GATEWAY_ENABLED: Joi.boolean().required(),
  LOGGING_API_GATEWAY_LEVEL: Joi.string()
    .allow("info", "fatal", "error", "warn", "info", "debug")
    .required(),
  LOGGING_APPLICATION_ENABLED: Joi.boolean().required(),
  LOGGING_APPLICATION_LEVEL: Joi.string()
    .allow("info", "fatal", "error", "warn", "info", "debug")
    .required(),
  LOGGING_MONGODB_ENABLED: Joi.boolean().required(),
  LOGGING_MONGODB_LEVEL: Joi.string()
    .allow("info", "fatal", "error", "warn", "info", "debug")
    .required(),
});

const { error, value: envVars } = envVarsSchema.validate(process.env, {
  allowUnknown: true,
});

if (error) {
  console.error(
    `Config ${process.env.NODE_ENV} validation error: ${error.message}`
  );
  throw new Error(
    `(NODE_ENV=${process.env.NODE_ENV}) Config validation error: ${error.message}`
  );
}

/* ====================================================== */
/*                      Public API                        */
/* ====================================================== */

module.exports = {
  NODE_ENV: envVars.NODE_ENV,
  PORT: envVars.PORT,
  isProduction: envVars.NODE_ENV === "production",
  isDevelopment: envVars.NODE_ENV === "development",
  isTesting: envVars.NODE_ENV === "test",
  logging: {
    apiGateway: {
      enabled: envVars.LOGGING_API_GATEWAY_ENABLED,
      level: envVars.LOGGING_API_GATEWAY_LEVEL,
    },
    application: {
      enabled: envVars.LOGGING_APPLICATION_ENABLED,
      level: envVars.LOGGING_APPLICATION_LEVEL,
    },
    mongoDb: {
      enabled: envVars.LOGGING_MONGODB_ENABLED,
      level: envVars.LOGGING_MONGODB_LEVEL,
    },
  },
  mongo: {
    url: envVars.MONGO_URL,
    databaseName: envVars.MONGO_DATABASE_NAME,
  },
};
