const mongoose = require("mongoose");
const { bugCollectionName } = require('../../constants').storageMongo;

const bugSchema = require('./schema');

module.exports.bugModel = mongoose.model('bug', bugSchema, bugCollectionName);