const { validSessionMiddleware } = require('../middlewares/session-check');
const { reportedByUserCheckMiddleWare } = require('../middlewares/bug');
const {
    getAllBugsHandler,
    getBugHandler,
    deleteBugHandler
} = require('../handlers/bug');

module.exports = (apiRouter) => {
    apiRouter.get('/bugs', validSessionMiddleware, getAllBugsHandler);
    apiRouter.get('/bugs/{:bugID}', validSessionMiddleware, getBugHandler);
    apiRouter.delete('/bugs/{:bugID}', validSessionMiddleware, reportedByUserCheckMiddleWare, deleteBugHandler);
};