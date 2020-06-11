module.exports.getUserBugAssociation = async (bug, userEmail) => {
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