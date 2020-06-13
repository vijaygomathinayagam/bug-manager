const allowedUsersList = require(`../../../resources/${process.env.Allowed_Users_Filename}`);

module.exports = async function() {
    return allowedUsersList;
}