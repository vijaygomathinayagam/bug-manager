const session = require('../storages/session');
const { authenticationCookieName } = require('../common').constants;

module.exports.validSessionMiddleware = async (req, res, next) => {
    const cookies = req.cookies;
    if(cookies[authenticationCookieName] 
        && await session.isSessionValid(cookies[authenticationCookieName])) {
            next();
    } else {
        res.sendStatus(401);
    }
};