const { getLoginURL, authenticateGoogleUser } = require('../user');
const { 
    App_Home_URL,
    App_Login_URL
} = require('../_common');

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
            res.cookie('bgu', sessionKey, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });
        } else {
            res.redirect(App_Login_URL);
        }
        postMessageData.isLoginSuccess = isSuccess;
        res.set('Content-Type', 'text/html');
        res.send(`<script>
            window.opener.postMessage(${JSON.stringify(postMessageData)}, '${process.env.Server_Host}');
            </script>`);
    });
    console.log('authentication routes added');   
}