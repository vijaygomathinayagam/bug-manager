const { validSessionMiddleware } = require('../middlewares/session-check');
const { reportedByUserCheckMiddleWare } = require('../middlewares/bug');
const { getAllBugsHandler, deleteBugHandler } = require('../handlers/bug');

module.exports = (apiRouter) => {
    apiRouter.get('/bugs', validSessionMiddleware, getAllBugsHandler);
    apiRouter.delete('/bugs/{:bugID}', validSessionMiddleware, reportedByUserCheckMiddleWare, deleteBugHandler);
};