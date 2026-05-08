const { Server } = require("socket.io");
const Cell = require("./models/Cell");

function initSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5174",
    },
  });

  io.on("connection", async (socket) => {
    console.log("User connected:", socket.id);

    // Send full grid initially
    const cells = await Cell.find();
    socket.emit("init_grid", cells);

    socket.on("claim_cell", async ({ x, y, userId, color }) => {
      try {
        const newCell = await Cell.create({
          x,
          y,
          ownerId: userId,
          color,
        });

        io.emit("cell_updated", newCell);
      } catch (err) {
        if (err.code === 11000) {
          console.log("Cell already claimed by someone else");
        } else {
          console.error(err);
        }
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
}

module.exports = { initSocket };
