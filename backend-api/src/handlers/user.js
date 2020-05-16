const userEntity = require('../entities/user');
const {
    authenticationCookieName,
    ErrorCodeLoginAPIAuthenticationFailed,
    ErrorCodeLoginAPIUserNotAllowed,
 } = require('../common').constants;
 const sessionStorage = require('../storages/session');
 
const getLoginURLHandler = async (req, res) => {
    res.json({
        url: await userEntity.getLoginURL(),
    });
};

const authenticateGoogleUserHander = async (req, res) => {
    const { isSuccess, userEmail } = await userEntity.authenticateGoogleUser(req.query.code);
    const postMessageData = {};

    if (isSuccess) {
        // create user session
        if(userEntity.isAllowedUser(userEmail)) {
            const sessionKey = await sessionStorage.createSession(userEmail);
            res.cookie(authenticationCookieName, sessionKey, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });
        } else {
            console.error(`${userEmail} is not an allowed user`);
            postMessageData.errorCode = ErrorCodeLoginAPIUserNotAllowed;
        }
    } else {
        postMessageData.errorCode = ErrorCodeLoginAPIAuthenticationFailed;
    }

    // sending login status
    postMessageData.isLoginSuccess = isSuccess;

    res.set('Content-Type', 'text/html');
    res.send(`<script>
        window.opener.postMessage(${JSON.stringify(postMessageData)}, '${process.env.Server_Host}');
        </script>`);
};

module.exports = {
    getLoginURLHandler,
    authenticateGoogleUserHander,
};

