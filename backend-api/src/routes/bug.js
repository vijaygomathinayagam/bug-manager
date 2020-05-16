const { validSessionMiddleware } = require('../middlewares/session-check');
const { getAllBugsHandler } = require('../handlers/bug');

module.exports = (apiRouter) => {
    apiRouter.get('/bugs', validSessionMiddleware, getAllBugsHandler);
};