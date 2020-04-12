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
        const status = await authenticateGoogleUser(req.query.code);
        if (status.isSuccess) {
            res.redirect(App_Home_URL);
        } else {
            res.redirect(App_Login_URL);
        }
    });
    console.log('authentication routes added');   
}