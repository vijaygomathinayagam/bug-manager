const { getUserBugAssociation } = require('../../entities/bug');

module.exports = async (req, res, next) => {
    const userEmail = req.locals.userEmail;
    const bug = req.locals.bug;
    const userAssociation = await getUserBugAssociation(bug, userEmail);

    if(userAssociation.isReportedByUser) {
        next();
    } else {
        res.sendStatus(401);
    }
};