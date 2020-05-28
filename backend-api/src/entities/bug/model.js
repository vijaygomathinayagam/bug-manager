const mongoose = require("mongoose");
const { bugCollectionName } = require('../../constants').storageMongo;

const bugSchema = require('./schema');

bugSchema.statics.getBugFromObject = function(bugObj) {
    const bug = new mongoose.model('bug')();
    bug.title = bugObj.title;
    bug.bugID = bugObj.bugID;
    bug.actualBehaviour = bugObj.actualBehaviour;
    bug.expectedBehaviour = bugObj.expectedBehaviour;
    bug.stepsToReproduce = bugObj.stepsToReproduce;
    bug.devices = bugObj.devices;
    bug.environment = bugObj.environment;bugObj.updatedAt
    if (bugObj.updatedAt) {
        bug.updatedAt = bugObj.updatedAt;
    }
    bug.reportedBy = bugObj.reportedBy;
    bug.assignedTo = bugObj.assignedTo;
    return bug;
}

const bugModel = mongoose.model('bug', bugSchema, bugCollectionName);

module.exports = {
    bugModel,
};