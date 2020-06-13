const sinon = require('sinon');
const { getFakeValidBug } = require('../../../_factories/data/bug');

describe("ediBugHandler method", async function() {

    const bugEntity = require('../../../../src/entities/bug');
    const bug = getFakeValidBug();
    const updatedBugObject = {
        expectedBehaviour: "changed",
    };

    let expressReq, expressRes;

    beforeEach(function() {
        sinon.stub(bugEntity, 'editBug');
        expressReq = {
            locals: {
                bug: bug,
            },
            body: updatedBugObject,
        };
        expressRes = {
            json: sinon.stub(),
        };
    });

    it("should call entity method and pass isSuccess: true to response", async function() {
        const ediBugHandler = require('../../../../src/handlers/bug/edit-handler');
        await ediBugHandler(expressReq, expressRes);
        sinon.assert.calledWith(bugEntity.editBug, bug, updatedBugObject);
        sinon.assert.calledWith(expressRes.json, {
            isSuccess: true,
        });
    });

    afterEach(function() {
        bugEntity.editBug.restore();
    });
});