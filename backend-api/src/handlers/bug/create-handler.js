const { createBug } = require('../../entities/bug');

module.exports = async (req, res) => {
    await createBug(req.locals.bug);
    res.json({
        isSuccess: true,
    });
};