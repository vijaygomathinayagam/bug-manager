const {
    getLoginURLHandler,
    authenticateGoogleUserHandler,
    getAllowedUsersHandler,
} = require('../handlers/user');
const { validSessionMiddleware } = require('../middlewares/session-check');
const wrapHandler = require('./error-safe-handler-wrapper');

module.exports = (apiRouter) => {
    apiRouter.get('/login-url',
        wrapHandler(getLoginURLHandler)
    );
    apiRouter.get('/authenticate/google/callback',
        wrapHandler(authenticateGoogleUserHandler)
    );
    apiRouter.get('/allowed-users',
        wrapHandler(validSessionMiddleware),
        wrapHandler(getAllowedUsersHandler)
    );
}