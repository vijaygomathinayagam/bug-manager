const { bugModel } = require('./model');

module.exports = async (bug) => {
    await bugModel.insertMany([ bug ]);
};