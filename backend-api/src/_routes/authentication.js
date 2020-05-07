const { getLoginURL, authenticateGoogleUser } = require('../user');
const { authenticationCookieName } = require('../_common').constants;

module.exports = (apiRouter) => {
    apiRouter.get('/login-url', async (req, res) => {
        res.json({
            url: await getLoginURL(),
        });
    });
    apiRouter.get('/authenticate/google/callback', async (req, res) => {
        const { isSuccess, sessionKey } = await authenticateGoogleUser(req.query.code);
        const postMessageData = {};
        if (isSuccess) {
            res.cookie(authenticationCookieName, sessionKey, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });
        }
        postMessageData.isLoginSuccess = isSuccess;
        res.set('Content-Type', 'text/html');
        res.send(`<script>
            window.opener.postMessage(${JSON.stringify(postMessageData)}, '${process.env.Server_Host}');
            </script>`);
    });
    console.log('authentication routes added');   
}