const sinon = require('sinon');
const assert = require('assert');
const { getFakeValidBug } = require('../../../_factories/data/bug');

describe("getBug method", async function() {

    const validBugID = '12345';
    const invalidBugID = '23456';
    const serverErrorBugID = '34567';
    const serverErrorName = 'some error';
    const bug = getFakeValidBug();
    const { bugModel } = require('../../../../src/entities/bug/model');

    before(function() {
        sinon.stub(bugModel, 'findOne')
            .withArgs({ bugID: validBugID }).resolves(bug)
            .withArgs({ bugID: invalidBugID }).rejects({code: 'MODULE_NOT_FOUND'})
            .withArgs({ bugID: serverErrorBugID }).rejects(serverErrorName);
        delete require.cache[require.resolve('../../../../src/entities/bug/get')];
    });

    it("should return true as exists and bug for valid bug id", async function() {
        const getBug = require('../../../../src/entities/bug/get');
        const actualReturnValue = await getBug(validBugID);
        const expectedReturnValue = {
            bug: bug,
            exists: true,
        };
        assert.deepEqual(actualReturnValue, expectedReturnValue);
    });

    it("should return false as exists for invalid bug id", async function() {
        const getBug = require('../../../../src/entities/bug/get');
        const actualReturnValue = await getBug(invalidBugID);
        const expectedReturnValue = {
            exists: false,
        };
        assert.deepEqual(actualReturnValue, expectedReturnValue);
    });

    it("should throw error for other errors", async function() {
        let isErrorThrown = false;
        const getBug = require('../../../../src/entities/bug/get');
        try {
            await getBug(serverErrorBugID);
        } catch(err) {
            isErrorThrown = true;
            assert.equal(err.name, serverErrorName);
        }
        assert(isErrorThrown);
    });

    after(function() {
        bugModel.findOne.restore();
    });
});