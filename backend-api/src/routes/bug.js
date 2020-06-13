const { validSessionMiddleware } = require('../middlewares/session-check');
const {
    reportedByUserCheckMiddleware,
    validBugObjectCheckMiddleware,
    validBugIDCheckMiddleware,
} = require('../middlewares/bug');
const {
    getAllBugsHandler,
    getBugHandler,
    createBugHandler,
    editBugHandler,
    deleteBugHandler,
    getEditableFieldsForUserAssociationsHandler
} = require('../handlers/bug');

module.exports = (apiRouter) => {
    apiRouter.get('/bugs', validSessionMiddleware, getAllBugsHandler);
    apiRouter.get('/bugs/{:bugID}', validSessionMiddleware, validBugIDCheckMiddleware, getBugHandler);
    apiRouter.post('/bugs', validSessionMiddleware, validBugObjectCheckMiddleware, createBugHandler);
    apiRouter.put('/bugs', validSessionMiddleware, validBugIDCheckMiddleware, editBugHandler);
    apiRouter.delete('/bugs/{:bugID}', validSessionMiddleware, validBugIDCheckMiddleware, reportedByUserCheckMiddleware, deleteBugHandler);
    apiRouter.get('/user-associations-bug-editable-fields', validSessionMiddleware, getEditableFieldsForUserAssociationsHandler);
};