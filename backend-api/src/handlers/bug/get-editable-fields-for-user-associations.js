const { getUserBugAssociationBugEditableFields } = require('../../entities/bug');

module.exports = async (req, res) => {
    res.json(await getUserBugAssociationBugEditableFields());
};