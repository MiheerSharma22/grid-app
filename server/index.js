const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./config/database");
require("dotenv").config();

const http = require("http");
const { initSocket } = require("./socket");

const app = express();
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";
const PORT = process.env.PORT || getPortFromUrl(BACKEND_URL, 5000);
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5174";

function getPortFromUrl(url, fallbackPort) {
  try {
    return new URL(url).port || fallbackPort;
  } catch {
    return fallbackPort;
  }
}

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  }),
);
app.use(express.json());

// home route
app.use("/", (req, res) => {
  res.send("<h1>Shared Grid App Backend</h1>");
});

connectDB();

const server = http.createServer(app);

initSocket(server);

server.listen(PORT, () => {
  console.log(`Server running on ${BACKEND_URL}`);
});
