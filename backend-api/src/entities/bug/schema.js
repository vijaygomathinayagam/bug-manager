const mongoose = require("mongoose");

module.exports = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  bugID: {
    type: String,
    required: true,
  },
  actualBehaviour: {
    type: String,
    required: true,
    trim: true,
  },
  expectedBehaviour: {
    type: String,
    required: true,
    trim: true,
  },
  stepsToReproduce: {
    type: String,
    required: true,
    trim: true,
  },
  devices: {
    type: [String],
  },
  environment: {
    type: [String],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  reportedBy: {
    type: String,
    required: true,
  },
  assignedTo: {
    type: String,
  }
});