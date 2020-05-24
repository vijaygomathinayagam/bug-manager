const { getUserBugAssociation } = require('../../entities/bug');

module.exports = async (req, res, next) => {
    const bugID = req.params.bugID;
    const userEmail = req.locals.userEmail;
    const userAssociation = await getUserBugAssociation(bugID, userEmail);

    if (userAssociation.exists) {
        if(userAssociation.association.isReportedByUser) {
            next();
        } else {
            res.sendStatus(401);
        }
    } else {
        res.sendStatus(400);
    }
};