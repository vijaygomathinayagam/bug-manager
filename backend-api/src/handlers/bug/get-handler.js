const { getUserBugAssociation } = require('../../entities/bug');

module.exports = async (req, res) => {
    res.json({
        bug: req.locals.bug,
        userAssociation: await getUserBugAssociation(req.locals.bug, req.locals.userEmail)
    });
};