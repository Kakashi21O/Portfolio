import { Redis } from "@upstash/redis";

const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

function getRedis(): Redis | null {
  if (!redisUrl || !redisToken) return null;
  return new Redis({ url: redisUrl, token: redisToken });
}

export async function rateLimit(
  identifier: string,
  limit: number,
  windowSeconds: number,
): Promise<{ success: boolean }> {
  const redis = getRedis();
  if (!redis) return { success: true };

  const key = `ratelimit:${identifier}`;
  const count = await redis.incr(key);
  if (count === 1) {
    await redis.expire(key, windowSeconds);
  }
  return { success: count <= limit };
}
