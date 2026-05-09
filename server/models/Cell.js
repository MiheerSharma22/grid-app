const mongoose = require("mongoose");

const cellSchema = new mongoose.Schema({
  x: Number,
  y: Number,
  ownerId: String,
  color: String,
});

// Ensure that each (x, y) pair is unique to prevent multiple claims on the same cell
cellSchema.index({ x: 1, y: 1 }, { unique: true });

module.exports = mongoose.model("Cell", cellSchema);
