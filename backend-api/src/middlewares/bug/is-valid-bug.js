const { bugModel } = require('../../entities/bug');

module.exports = async (req, res, next) => {
    const bug = bugModel.getBugFromObject(req.body);
    if(!bug.validateSync()) {
        next();
    } else {
        res.sendStatus(400);
    }
};