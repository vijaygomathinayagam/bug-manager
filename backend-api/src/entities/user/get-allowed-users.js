const filename = process.env.Allowed_Users_Filename || 'allowed_users_dev.json';
const allowedUsersList = require(`../../../resources/${filename}`);

module.exports = function() {
    return allowedUsersList;
}