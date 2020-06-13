const allowedUsersList = require(`../../../resources/${process.env.Allowed_Users_Filename}`);

module.exports = (userEmail) => {
    return allowedUsersList.includes(userEmail);
}