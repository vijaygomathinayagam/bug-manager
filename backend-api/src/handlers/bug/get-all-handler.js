const bugEntity = require('../../entities/bug');

module.exports = async (req, res) => {
    const filter = JSON.parse(req.query.filter);
    res.json(await bugEntity.getAllBugs(filter));
};