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
const wrapHandler = require('./error-safe-handler-wrapper');

module.exports = (apiRouter) => {
    apiRouter.get('/bugs',
        wrapHandler(validSessionMiddleware),
        wrapHandler(getAllBugsHandler)
    );
    apiRouter.get('/bugs/:bugID',
        wrapHandler(validSessionMiddleware),
        wrapHandler(validBugIDCheckMiddleware),
        wrapHandler(getBugHandler)
    );
    apiRouter.post('/bugs',
        wrapHandler(validSessionMiddleware),
        wrapHandler(validBugObjectCheckMiddleware),
        wrapHandler(createBugHandler)
    );
    apiRouter.put('/bugs',
        wrapHandler(validSessionMiddleware),
        wrapHandler(validBugIDCheckMiddleware),
        wrapHandler(editBugHandler)
    );
    apiRouter.delete('/bugs/:bugID',
        wrapHandler(validSessionMiddleware),
        wrapHandler(validBugIDCheckMiddleware),
        wrapHandler(reportedByUserCheckMiddleware),
        wrapHandler(deleteBugHandler)
    );
    apiRouter.get('/user-associations-bug-editable-fields',
        wrapHandler(validSessionMiddleware),
        wrapHandler(getEditableFieldsForUserAssociationsHandler)
    );
};