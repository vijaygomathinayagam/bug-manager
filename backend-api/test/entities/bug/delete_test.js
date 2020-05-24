const sinon = require('sinon');
const assert = require('assert');

describe("deleteBug method", async function() {
    const fakeBugID = '12345';
    const { bugModel } = require('../../../src/entities/bug');

    let deleteManyStub;

    before(function() {
        deleteManyStub = sinon.stub(bugModel, 'deleteMany');
        delete require.cache[require.resolve('../../../src/entities/bug/delete')];
    });

    it("should delete the bug and return isSuccess as true with valid bugID", async function() {
        const deleteBug = require('../../../src/entities/bug/delete');
        const actualReturnValue = await deleteBug(fakeBugID);
        const expectedReturnValue = { isSuccess: true };
        sinon.assert.calledWith(deleteManyStub, { bugID: fakeBugID });
        assert.deepEqual(actualReturnValue, expectedReturnValue);
    });

    after(function() {
        bugModel.deleteMany.restore();
    });
});