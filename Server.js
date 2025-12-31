import app from "./App.js";
import { sequelize } from "./Config/db.config.js";
import ENV from "./Config/env.config.js";
import logger from "./Utils/Logger.js";


// Start the server after DB sync
sequelize
  .sync({ alter: true })
  .then(() => {
    app.listen(ENV.port, () => {
      // Start worker safely after server is running
      import("./Jobs/Workers/email.worker.js")
        .then(({ startEmailWorker }) => startEmailWorker())
        .catch((err) => {
          logger.error("Failed to start email worker:", err);
        });

      logger.info(`Server is running on port: ${ENV.port}`);
    });
  })
  .catch((err) => {
    logger.error("Database sync failed:", err);
  });

// Optional: Catch unhandled rejections globally
process.on("unhandledRejection", (err) => {
  logger.error("Unhandled Rejection:", err);
});

process.on("uncaughtException", (err) => {
  logger.error("Uncaught Exception:", err);
});
