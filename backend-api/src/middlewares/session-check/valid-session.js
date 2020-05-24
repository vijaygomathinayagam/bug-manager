const session = require('../../common/session');
const { authenticationCookieName } = require('../../constants').api;

module.exports = async (req, res, next) => {
    const cookies = req.cookies;

    if(cookies[authenticationCookieName]) {
        const sessionValueExistsStatus = await session.isSessionValid(cookies[authenticationCookieName]);

        if(sessionValueExistsStatus.exists) {
            req.locals = { userEmail: sessionValueExistsStatus.sessionKey };
            next();
            return;
        }
    }
    res.sendStatus(401);
};