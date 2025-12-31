// Start worker in server.js

import { Worker } from "bullmq";
import { redisConn } from "../../Config/redis.config.js";
import transporter from "../../Config/email.config.js";
import ENV from "../../Config/env.config.js";
import logger from "../../Utils/Logger.js";

// Wrap worker startup in a function
export const startEmailWorker = () => {
  const emailWorker = new Worker(
    "sendEmailQueue",
    async (job) => {
      try {
        const { to, subject, html } = job.data;

        await transporter.sendMail({
          from: `Pathlearn <${ENV.email.user}>`,
          to,
          subject,
          html,
        });
      } catch (err) {
        logger.error(`Failed to send email for job ${job.id}:`, err);
        // Throwing here allows BullMQ to retry the job if retries are configured
        throw err;
      }
    },
    { connection: redisConn }
  );

  emailWorker.on("completed", (job) => {
    logger.info(`Email job ${job.id} completed`);
  });

  emailWorker.on("failed", (job, err) => {
    logger.error(`Email job ${job?.id} failed:`, err);
  });

  // Catch unexpected worker-level errors
  emailWorker.on("error", (err) => {
    logger.error("Worker error:", err);
  });

  return emailWorker;
};
