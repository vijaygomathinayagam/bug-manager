const { deleteBug } = require('../../entities/bug');

module.exports = async (req, res) => {
    res.json(await deleteBug(req.params.bugID));
};