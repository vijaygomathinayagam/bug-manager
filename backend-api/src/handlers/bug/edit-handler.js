const bugEntity = require('../../entities/bug');

module.exports = async (req, res) => {
    const bug = req.locals.bug;
    const updatedBugObject = req.body;

    await bugEntity.editBug(bug, updatedBugObject);

    res.json({
        isSuccess: true,
    });
};