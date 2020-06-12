const sinon = require('sinon');
const { getFakeValidBug } = require('../../_factories/data/bug');

describe("isEditableFieldsCheckMiddleware method", async function() {

    const bugEntity = require('../../../src/entities/bug');

    const bug = getFakeValidBug();
    const userEmail = 'testuser@gmail.com';
    const nonEditableFields = { "_id": 1 };
    const editableFields1 = { "actualBehaviour": "changed" };
    const editableFields2 = { "expectedBehaviour": "changed" };

    let expressReq, expressRes, expressNext;

    beforeEach(function() {
        expressReq = {
            locals: {
                bug: bug,
                userEmail: userEmail,
            },
        };
        expressRes = {
            sendStatus: sinon.stub(),
        };
        expressNext = sinon.stub();

        getUserBugAssociationStub = sinon.stub(bugEntity, 'getUserBugAssociation')
            .withArgs(bug, userEmail).resolves({ isReportedByUser: true, isAssignedToUser: true });
        getBugEditableFieldsStub = sinon.stub(bugEntity, 'getBugEditableFields').resolves({
            "isReportedByUser": ["actualBehaviour"],
            "isAssignedToUser": ["expectedBehaviour"],
        });
        delete require.resolve('../../../src/middlewares/bug/is-editable-fields');
    });

    it("should return status 400 if bug objects contains non editable fields", async function() {
        expressReq.body = nonEditableFields;
        const isEditableFieldsCheckMiddleware = require('../../../src/middlewares/bug/is-editable-fields');
        await isEditableFieldsCheckMiddleware(expressReq, expressRes, expressNext);
        sinon.assert.calledWith(bugEntity.getUserBugAssociation, bug, userEmail);
        sinon.assert.called(bugEntity.getBugEditableFields);
        sinon.assert.calledWith(expressRes.sendStatus, 400);
        sinon.assert.notCalled(expressNext);
    });

    it("should call next if bug objects contains editable fields", async function() {
        expressReq.body = editableFields1;
        const isEditableFieldsCheckMiddleware = require('../../../src/middlewares/bug/is-editable-fields');
        await isEditableFieldsCheckMiddleware(expressReq, expressRes, expressNext);
        sinon.assert.calledWith(bugEntity.getUserBugAssociation, bug, userEmail);
        sinon.assert.called(bugEntity.getBugEditableFields);
        sinon.assert.notCalled(expressRes.sendStatus);
        sinon.assert.called(expressNext);
    });

    it("should call next if bug objects contains editable fields of different associations", async function() {
        expressReq.body = editableFields2;
        const isEditableFieldsCheckMiddleware = require('../../../src/middlewares/bug/is-editable-fields');
        await isEditableFieldsCheckMiddleware(expressReq, expressRes, expressNext);
        sinon.assert.calledWith(bugEntity.getUserBugAssociation, bug, userEmail);
        sinon.assert.called(bugEntity.getBugEditableFields);
        sinon.assert.notCalled(expressRes.sendStatus);
        sinon.assert.called(expressNext);
    });

    afterEach(function() {
        expressReq = expressRes = expressNext = undefined;
        bugEntity.getBugEditableFields.restore();
        bugEntity.getUserBugAssociation.restore();
    })
})