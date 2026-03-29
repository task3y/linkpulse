import redis from "redis";
const { createClient } = redis;

const client = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});

client.on("error", (error) => console.log("Redis error:", error));
client.on("connect", () => console.log("Redis connected"));

client.connect();

const getCachedUrl = async (slug) => {
  const cached = await client.get(`link:${slug}`);
  return cached || null;
};

const setCachedUrl = async (slug, originalUrl) => {
  await client.setEx(`link${slug}`, 86400, originalUrl);
};

const deleteCachedUrl = async (slug) => {
  await client.del(`link${slug}`);
};

export { getCachedUrl, setCachedUrl, deleteCachedUrl };
