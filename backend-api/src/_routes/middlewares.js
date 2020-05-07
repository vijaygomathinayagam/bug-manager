const session = require('../user/session');
const { authenticationCookieName } = require('../_common').constants;

module.exports.validSessionMiddleware = async (req, res, next) => {
    const cookies = req.cookies;
    console.log(cookies);
    if(cookies[authenticationCookieName] 
        && await session.isSessionValid(cookies[authenticationCookieName])) {
        next();
    } else {
        res.sendStatus(401);
    }
};