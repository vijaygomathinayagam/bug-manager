const userEntity = require('../../entities/user');
const htmlTemplateParser = require('../../common/html-template-parser');
const sessionStorage = require('../../common/session');
const {
    ErrorCodeLoginAPIAuthenticationFailed,
    ErrorCodeLoginAPIUserNotAllowed,
    SuccessCodeLoginAPILoginSuccess
 } = require('../../constants').messageCode;
 const {
    authenticationCookieName,
    athenticatePostmessageScript,
    authenticationCookieMaxAge
} = require('../../constants').api;
 
module.exports.authenticateGoogleUserHandler = async (req, res) => {
    const { isSuccess, userEmail } = await userEntity.authenticateGoogleUser(req.query.code);
    const postMessageData = {};

    if (isSuccess) {
        // create user session
        if(userEntity.isAllowedUser(userEmail)) {
            const sessionKey = await sessionStorage.createSession(userEmail);
            res.cookie(authenticationCookieName, sessionKey, { maxAge: authenticationCookieMaxAge, httpOnly: true });
            postMessageData.messageCode = SuccessCodeLoginAPILoginSuccess;
            postMessageData.isLoginSuccess = true;
        } else {
            console.error(`${userEmail} is not an allowed user`);
            postMessageData.messageCode = ErrorCodeLoginAPIUserNotAllowed;
            postMessageData.isLoginSuccess = false;
        }
    } else {
        postMessageData.messageCode = ErrorCodeLoginAPIAuthenticationFailed;
        postMessageData.isLoginSuccess = false;
    }

    res.set('Content-Type', 'text/html');
    res.send(htmlTemplateParser.parseHTMLTemplate(athenticatePostmessageScript, {
        postMessageJSON: JSON.stringify(postMessageData),
        host: process.env.Server_Host
    }));
};