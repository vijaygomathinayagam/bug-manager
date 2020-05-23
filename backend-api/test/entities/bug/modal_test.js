const assert = require('assert');
const {
    getFakeValidBugObj,
    getFakeInvalidBugObjEmpty,
} = require('../../_factories/data/bug');

describe("bug model", async function() {

    it("bug modal should return error validating invalid data", function() {
        let error = getFakeInvalidBugObjEmpty().validateSync();
        assert.notEqual(error.errors.title, undefined);
        assert.notEqual(error.errors.bugID, undefined);
        assert.notEqual(error.errors.actualBehaviour, undefined);
        assert.notEqual(error.errors.expectedBehaviour, undefined);
        assert.notEqual(error.errors.stepsToReproduce, undefined);
        assert.notEqual(error.errors.reportedBy, undefined);
    });

    it("bug modal should not return error validating valid data", function() {
        const error = getFakeValidBugObj().validateSync();
        assert.equal(error, undefined);
    });

});