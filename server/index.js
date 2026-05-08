const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./config/database");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());

// home route
app.use("/", (req, res) => {
  res.send("<h1>Shared Grid App Backend</h1>");
});

connectDB();

const server = app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});
