const bugEntity = require('../entities/bug');

const getAllBugsHandler = async (req, res) => {
    res.json(await bugEntity.getAllBugs());
};

module.exports = {
    getAllBugsHandler
};