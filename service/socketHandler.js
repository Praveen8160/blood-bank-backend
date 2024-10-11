const socketIo = require("socket.io");
let io;
const activeUsers = new Map();
const redisclient = require("./Redis.js");
const initSocket = (server) => {
  io = socketIo(server, {
    pingTimeout: 60000,
    cors: {
      origin: ['https://www.lifeflow.site', 'https://lifeflow.site'],
      credentials: true, // Allow credentials
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected");
    socket.on("register", async (userId) => {
      activeUsers.set(userId, socket.id);
      console.log(`User ${userId} registered with socket ID ${socket.id}`);
      try {
        const missedMessages = await redisclient.lRange(
          `notifications:${userId}`,
          0,
          -1
        );
        console.log(missedMessages);
        missedMessages.forEach((message) => {
          io.to(socket.id).emit("newRequest", {
            message
          });
        });
      } catch (error) {
        console.error("Error handling missed messages:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
      for (const [userId, socketId] of activeUsers.entries()) {
        if (socketId === socket.id) {
          activeUsers.delete(userId);
          break;
        }
      }
    });
  });
};

const getIo = () => io;
const getActiveUsers = () => activeUsers;

module.exports = { initSocket, getIo, getActiveUsers };
