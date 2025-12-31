import IORedis from 'ioredis';
import ENV from './env.config.js';

export const redisConn = new IORedis(ENV.redis.url, {
  maxRetriesPerRequest: null,   // important for BullMQ
  enableReadyCheck: false
});
