module.exports = {
    bugModel: require('./model').bugModel,
    getAllBugs: require('./get-all'),
    getBug: require('./get'),
    deleteBug: require('./delete'),
    getUserBugAssociation: require('./user-association').getUserBugAssociation,
}