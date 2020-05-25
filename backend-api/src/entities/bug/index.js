module.exports = {
    bugModel: require('./model').bugModel,
    getAllBugs: require('./get-all'),
    getBug: require('./get'),
    createBug: require('./create'),
    deleteBug: require('./delete'),
    getUserBugAssociation: require('./user-association').getUserBugAssociation,
}