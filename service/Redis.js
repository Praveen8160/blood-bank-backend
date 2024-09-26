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
