const { validSessionMiddleware } = require('../middlewares/session-check');
const {
    reportedByUserCheckMiddleware,
    validBugCheckMiddleware
} = require('../middlewares/bug');
const {
    getAllBugsHandler,
    getBugHandler,
    createBugHandler,
    deleteBugHandler,
    getEditableFieldsForUserAssociationsHandler
} = require('../handlers/bug');

module.exports = (apiRouter) => {
    apiRouter.get('/bugs', validSessionMiddleware, getAllBugsHandler);
    apiRouter.get('/bugs/{:bugID}', validSessionMiddleware, validBugCheckMiddleware, getBugHandler);
    apiRouter.post('/bugs', validSessionMiddleware, validBugCheckMiddleware, createBugHandler);
    apiRouter.delete('/bugs/{:bugID}', validSessionMiddleware, validBugCheckMiddleware, reportedByUserCheckMiddleware, deleteBugHandler);
    apiRouter.get('/user-associations-bug-editable-fields', validSessionMiddleware, getEditableFieldsForUserAssociationsHandler);
};