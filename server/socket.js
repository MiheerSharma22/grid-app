const { Server } = require("socket.io");
const Cell = require("./models/Cell");

const onlineUsers = new Map();

function initSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5174",
    },
  });

  io.on("connection", async (socket) => {
    console.log("User connected:", socket.id);

    // Initial grid
    const cells = await Cell.find();

    socket.emit("init_grid", cells);

    // Register user
    socket.on("register_user", ({ userId, color }) => {
      onlineUsers.set(userId, {
        socketId: socket.id,
        color,
      });

      emitLeaderboard(io);
    });

    // Claim cell
    socket.on("claim_cell", async ({ x, y, userId, color }) => {
      try {
        const newCell = await Cell.create({
          x,
          y,
          ownerId: userId,
          color,
        });

        // Broadcast the updated cell to all clients
        io.emit("cell_updated", newCell);

        emitLeaderboard(io);
      } catch (err) {
        if (err.code === 11000) {
          console.log("Already claimed");
        } else {
          console.error(err);
        }
      }
    });

    socket.on("disconnect", () => {
      for (const [userId, value] of onlineUsers) {
        if (value.socketId === socket.id) {
          onlineUsers.delete(userId);
          break;
        }
      }

      emitLeaderboard(io);

      console.log("Disconnected:", socket.id);
    });
  });
}

async function emitLeaderboard(io) {
  const cells = await Cell.find();

  const leaderboardMap = {};

  cells.forEach((cell) => {
    if (!leaderboardMap[cell.ownerId]) {
      leaderboardMap[cell.ownerId] = {
        userId: cell.ownerId,
        color: cell.color,
        blocks: 0,
        online: onlineUsers.has(cell.ownerId),
      };
    }

    leaderboardMap[cell.ownerId].blocks += 1;
  });

  const leaderboard = Object.values(leaderboardMap).sort(
    (a, b) => b.blocks - a.blocks,
  );

  io.emit("leaderboard_update", leaderboard);
}

module.exports = { initSocket };
