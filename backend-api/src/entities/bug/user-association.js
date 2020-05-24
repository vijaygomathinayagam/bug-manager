const { bugModel } = require('./model');

const getAssociation = (bug, userEmail) => {
    const association = {};
    if(userEmail === bug.reportedBy) {
        association.isReportedByUser = true;
    }
    if(userEmail === bug.assignedTo) {
        association.isAssignedToUser = true;
    }
    if(!association.isReportedByUser && !association.isAssignedToUser) {
        association.isOther = true;
    }
    return association;
};

module.exports.getUserBugAssociation = async (bugID, userEmail) => {
    try {
        const bug = await bugModel.find({ bugID: bugID });
        return {
            exists: true,
            association: getAssociation(bug, userEmail),
        };        
    } catch(err) {
        if(err.code === 'MODULE_NOT_FOUND') {
            return {
                exists: false
            };
        }
        throw err;
    }
};