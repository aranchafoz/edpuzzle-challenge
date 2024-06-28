require("dotenv").config({
  path: `./src/shared/infrastructure/env/${process.env.NODE_ENV}.env`,
});

const HttpApi = require("./entry_point/api_gateway/application");

/* ====================================================== */
/*                     Implementation                     */
/* ====================================================== */

const httpApi = new HttpApi();

httpApi
  .start()
  .then(({ logger }) => {
    process.on("unhandledRejection", (err) => {
      logger.fatal(err);
      process.exit(1);
    });
  })
  .catch((err) => {
    process.exit(1);
  });
