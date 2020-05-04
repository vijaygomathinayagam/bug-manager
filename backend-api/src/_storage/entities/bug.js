const mongoose = require('../mongo');

const bug = mongoose.model('bug', {
    name: String
});

module.exports = bug;