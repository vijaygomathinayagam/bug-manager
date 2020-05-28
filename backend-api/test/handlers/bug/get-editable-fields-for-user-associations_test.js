const sinon = require('sinon');
const bugEntity = require('../../../src/entities/bug');

describe("getEditableFieldsForUserAssociationsHandler method", async function() {

    const entityReturnValue = {
        "reportedBy": [ "title" ]
    };
    let expressReq, expressRes;
    let getUserBugAssociationBugEditableFieldsStub;

    beforeEach(function() {
        expressReq = {};
        expressRes = {
            json: sinon.stub()
        };
        getUserBugAssociationBugEditableFieldsStub = sinon.stub(bugEntity, 'getUserBugAssociationBugEditableFields')
           .resolves(entityReturnValue);
        delete require.cache[require.resolve('../../../src/handlers/bug/get-editable-fields-for-user-associations')];
    });

    it("should call entity method and return its value", async function() {
        const getEditableFieldsForUserAssociationsHandler = require('../../../src/handlers/bug/get-editable-fields-for-user-associations');
        await getEditableFieldsForUserAssociationsHandler(expressReq, expressRes);
        sinon.assert.called(getUserBugAssociationBugEditableFieldsStub);
        sinon.assert.calledWith(expressRes.json, entityReturnValue);
    });

    afterEach(function() {
       bugEntity.getUserBugAssociationBugEditableFields.restore();
    });
});