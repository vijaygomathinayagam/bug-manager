const { bugModel } = require('../../entities/bug');

module.exports = async (req, res, next) => {
    const bug = bugModel.getBugFromObject(req.body);
    if(!bug.validateSync()) {
        req.locals.bug = bug;
        next();
    } else {
        res.sendStatus(400);
    }
};