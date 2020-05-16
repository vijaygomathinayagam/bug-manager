const { getLoginURLHandler, authenticateGoogleUserHander } = require('../handlers/user');

module.exports = (apiRouter) => {
    apiRouter.get('/login-url', getLoginURLHandler);
    apiRouter.get('/authenticate/google/callback', authenticateGoogleUserHander);
}