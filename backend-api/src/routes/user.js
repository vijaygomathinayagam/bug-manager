const { 
    getLoginURLHandler,
    authenticateGoogleUserHandler,
    getAllowedUsersHandler, 
} = require('../handlers/user');
const { validSessionMiddleware } = require('../middlewares/session-check');

module.exports = (apiRouter) => {
    apiRouter.get('/login-url', getLoginURLHandler);
    apiRouter.get('/authenticate/google/callback', authenticateGoogleUserHandler);
    apiRouter.get('/allowed-users', validSessionMiddleware, getAllowedUsersHandler)
}