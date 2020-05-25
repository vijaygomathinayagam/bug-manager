const { validSessionMiddleware } = require('../middlewares/session-check');
const {
    reportedByUserCheckMiddleware,
    validBugCheckMiddleware
} = require('../middlewares/bug');
const {
    getAllBugsHandler,
    getBugHandler,
    createBugHandler,
    deleteBugHandler
} = require('../handlers/bug');

module.exports = (apiRouter) => {
    apiRouter.get('/bugs', validSessionMiddleware, getAllBugsHandler);
    apiRouter.get('/bugs/{:bugID}', validSessionMiddleware, getBugHandler);
    apiRouter.post('/bugs', validSessionMiddleware, validBugCheckMiddleware, createBugHandler);
    apiRouter.delete('/bugs/{:bugID}', validSessionMiddleware, reportedByUserCheckMiddleware, deleteBugHandler);
};