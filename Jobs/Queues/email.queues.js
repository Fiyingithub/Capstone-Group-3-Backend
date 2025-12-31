import { Queue } from "bullmq";
import { redisConn } from "../../Config/redis.config.js";


export const emailQueue = new Queue("sendEmailQueue", {
  connection: redisConn,
});


