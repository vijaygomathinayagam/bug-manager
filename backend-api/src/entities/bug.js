const mongoose = require("mongoose");
const { bugCollectionName } = require('../common').constants;

 const bugSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  bugID: {
    type: Number,
    required: true,
  },
});

const bugModal = mongoose.model('bug', bugSchema, bugCollectionName);

const getAllBugs = async () => {
  return await bugModal.find({});
};

module.exports = {
  bugModal: bugModal,
  getAllBugs,
};
