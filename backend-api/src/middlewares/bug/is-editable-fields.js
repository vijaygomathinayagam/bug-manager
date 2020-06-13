const bugEntity = require('../../entities/bug');

module.exports = async (req, res, next) => {
    const associationEditableFields = await bugEntity.getBugEditableFields();
    const userBugAssociation = await bugEntity.getUserBugAssociation(req.locals.bug, req.locals.userEmail);

    const editableFields = [];
    const associationKeys = Object.keys(userBugAssociation);
    for (const associationKey of associationKeys) {
        editableFields.push(...associationEditableFields[associationKey]);
    }

    const requestBugObjectKeys = Object.keys(req.body);
    for (const requestBugObjKey of requestBugObjectKeys) {
        if (!editableFields.includes(requestBugObjKey)) {
            res.sendStatus(400);
            return;
        }
    }
    next();
};