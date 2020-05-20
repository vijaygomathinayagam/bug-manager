const bugEntity = require('../../entities/bug');

module.exports = async (req, res) => {
    res.json(await bugEntity.getAllBugs());
};