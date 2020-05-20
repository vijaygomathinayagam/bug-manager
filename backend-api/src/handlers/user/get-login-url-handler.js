const userEntity = require('../../entities/user');

module.exports = async (req, res) => {
    res.json({
        url: await userEntity.getLoginURL(),
    });
};