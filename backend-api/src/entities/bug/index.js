module.exports = {
    bugModel: require('./model').bugModel,
    getAllBugs: require('./get-all'),
    getBug: require('./get'),
    createBug: require('./create'),
    editBug: require('./edit'),
    deleteBug: require('./delete'),
    getUserBugAssociation: require('./user-association'),
    getBugEditableFields: require('./get-editable-fields'),
}