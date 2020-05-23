const allowedUsersList = require('../../../resources/allowed_users.json');

module.exports = async (userEmail) => {
    return allowedUsersList.includes(userEmail);
}