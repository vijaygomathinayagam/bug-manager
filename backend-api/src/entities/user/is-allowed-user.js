const allowedUsersList = require('./get-allowed-users')();

module.exports = (userEmail) => {
    return allowedUsersList.includes(userEmail);
}