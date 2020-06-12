const { getBugEditableFields } = require('../../entities/bug');

module.exports = async (req, res) => {
    res.json(await getBugEditableFields());
};