const { getBug } = require('../../entities/bug');

module.exports = async (req, res) => {
    const bugResponse = await getBug(req.params.bugID);
    if (bugResponse.exists) {
        res.json({
            bug: bugResponse.bug,
        })
    } else {
        res.sendStatus(400);
    }
};