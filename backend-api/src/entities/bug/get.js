const { bugModel } = require('./model');

module.exports = async (bugID) => {
    try {
        const bug = await bugModel.findOne({ bugID: bugID });
        return {
            bug: bug,
            exists: true,
        };
    } catch(err) {
        if (err.code === 'MODULE_NOT_FOUND') {
            return {
                exists: false,
            };
        }
        throw err;
    }
};