const { bugModel } = require('./modal');

module.exports = async (bugID) => {
    await bugModel.deleteMany({ bugID: bugID });
    return {
        isSuccess: true,
    };
};