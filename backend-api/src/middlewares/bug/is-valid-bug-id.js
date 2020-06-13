const bugEntity = require('../../entities/bug');

module.exports = async (req, res, next) => {
    const bugID = req.params.bugID;
    const bugAndStatus = await bugEntity.getBug(bugID);

    if (bugAndStatus.exists) {
        req.locals.bug = bugAndStatus.bug;
        next();
    } else {
        res.sendStatus(400);
    }
};