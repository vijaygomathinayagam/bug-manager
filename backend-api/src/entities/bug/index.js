module.exports = {
    bugModel: require('./model').bugModel,
    getAllBugs: require('./get-all'),
    deleteBug: require('./delete'),
    getUserBugAssociation: require('./user-association').getUserBugAssociation,
}