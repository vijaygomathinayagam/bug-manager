const sinon = require('sinon');
const bugEntity = require('../../../../src/entities/bug');

describe("getEditableFieldsForUserAssociationsHandler method", async function() {

    const entityReturnValue = {
        "reportedBy": [ "title" ]
    };
    let expressReq, expressRes;
    let getBugEditableFieldsStub;

    beforeEach(function() {
        expressReq = {};
        expressRes = {
            json: sinon.stub()
        };
        getBugEditableFieldsStub = sinon.stub(bugEntity, 'getBugEditableFields')
           .resolves(entityReturnValue);
        delete require.cache[require.resolve('../../../../src/handlers/bug/get-editable-fields-for-user-associations')];
    });

    it("should call entity method and return its value", async function() {
        const getEditableFieldsForUserAssociationsHandler = require('../../../../src/handlers/bug/get-editable-fields-for-user-associations');
        await getEditableFieldsForUserAssociationsHandler(expressReq, expressRes);
        sinon.assert.called(getBugEditableFieldsStub);
        sinon.assert.calledWith(expressRes.json, entityReturnValue);
    });

    afterEach(function() {
       bugEntity.getBugEditableFields.restore();
    });
});