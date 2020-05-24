const sinon = require('sinon');

describe("deleteBugHandler method", async function() {

    const bugEntity = require('../../../src/entities/bug');
    const fakeDeleteBugReturnValue = { isSuccess: true };
    const fakeBugID = '12345';
    
    let deleteBugStub;

    beforeEach(function() {
        deleteBugStub = sinon.stub(bugEntity, 'deleteBug').callsFake(async () => fakeDeleteBugReturnValue);
        delete require.cache[require.resolve('../../../src/handlers/bug/delete-handler')];
    });

    it("should call bug entity method and return its value", async function() {
        const expressReq = {
            query: {
                bugID: fakeBugID,
            }
        };
        const expressRes = {
            json: sinon.stub(),
        };
        const deleteBugHandler = require('../../../src/handlers/bug/delete-handler');
        await deleteBugHandler(expressReq, expressRes);
        sinon.assert.calledWith(deleteBugStub, fakeBugID);
        sinon.assert.calledWith(expressRes.json, fakeDeleteBugReturnValue);
    });

    afterEach(function() {
        bugEntity.deleteBug.restore();
    });
});