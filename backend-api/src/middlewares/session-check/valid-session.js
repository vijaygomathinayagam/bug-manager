const session = require('../../common/session');
const { authenticationCookieName } = require('../../constants').api;

module.exports = async (req, res, next) => {
    const cookies = req.cookies;
    if(cookies[authenticationCookieName] 
        && await session.isSessionValid(cookies[authenticationCookieName])) {
            next();
    } else {
        res.sendStatus(401);
    }
};