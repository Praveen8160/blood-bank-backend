// const redis = require('redis');
// const client = redis.createClient({
//   url: process.env.REDIS_URL || 'redis://localhost:6379'
// });

// import { createClient } from "redis";
const { createClient } = require('redis');
const client = createClient({
  password: process.env.Password,
  socket: {
    host: process.env.host,
    port: process.env.redisport,
  },
});
client.on("error", (err) => {
  console.error("Redis Client Error", err);
});

client.connect();

module.exports = client;
