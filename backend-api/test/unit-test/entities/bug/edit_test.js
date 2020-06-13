const sinon = require('sinon');
const assert = require('assert');
const { getFakeValidBug } = require('../../../_factories/data/bug');

describe("editBug method", async function() {

    const bug = getFakeValidBug();
    const updatedBugObject = {
        expectedBehaviour: "changed",
    };

    beforeEach(function() {
        sinon.stub(bug, 'save');
    });

    it("should call assign values from bug object and call save method", async function() {
        const editBug = require('../../../../src/entities/bug/edit');
        await editBug(bug, updatedBugObject);
        assert(bug.expectedBehaviour === updatedBugObject.expectedBehaviour);
        sinon.assert.called(bug.save);
    });

    afterEach(function() {
        bug.save.restore();
    });
});