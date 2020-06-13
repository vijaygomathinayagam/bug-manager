const userEntity = require('../../entities/user');

module.exports = async (req, res) => {
    res.json({
        users: userEntity.getAllowedUsers(),
    });
};