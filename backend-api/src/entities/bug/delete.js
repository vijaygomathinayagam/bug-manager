const { bugModel } = require('./model');

module.exports = async (bugID) => {
    await bugModel.deleteMany({ bugID: bugID });
    return {
        isSuccess: true,
    };
};