let allowedUsersList;

if(process.env.NODE_ENV==='development') {
    allowedUsersList = require('../../../resources/allowed_users.json');
} else {
    allowedUsersList = require('../../../resources/allowed_users_dev.json')
}

module.exports = (userEmail) => {
    return allowedUsersList.includes(userEmail);
}