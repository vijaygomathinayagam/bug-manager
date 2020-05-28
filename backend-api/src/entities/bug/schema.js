const mongoose = require("mongoose");

const { isAllowedUser } = require('../user');

const emailValidatorFunction = function(email) {
  return isAllowedUser(email);
};

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
    validate: {
      validator: emailValidatorFunction,
      message: props => `${props.value} is not an allowed user email`
    },
  },
  assignedTo: {
    type: String,
    validate: {
      validator: function(email) {
        return !email || emailValidatorFunction(email);
      },
      message: props => `${props.value} is not an allowed user email`
    }
  }
});