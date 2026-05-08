const mongoose = require("mongoose");

const cellSchema = new mongoose.Schema({
  x: Number,
  y: Number,
  ownerId: String,
  color: String,
});

module.exports = mongoose.model("Cell", cellSchema);
