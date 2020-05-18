const sinon = require('sinon');
const assert = require('assert');
const { bugModal, getAllBugs } = require('../../../src/entities/bug');
const {
    getFakeValidBugObj,
    getFakeInvalidBugObjEmpty,
    getFakeInvalidBugObjOnlyBugID,
    getFakeInvalidBugObjOnlyTitle,
} = require('../data-factories/bug');

describe("bug entity methods", async function() {

    describe("bug model", async function() {

        it("bug modal should return error validating invalid data", function() {
            let error = getFakeInvalidBugObjEmpty().validateSync();
            assert.notEqual(error.errors.title, undefined);
            assert.notEqual(error.errors.bugID, undefined);

            error = getFakeInvalidBugObjOnlyBugID().validateSync();
            assert.notEqual(error.errors.title, undefined);
            
            error = getFakeInvalidBugObjOnlyTitle().validateSync();
            assert.notEqual(error.errors.bugID, undefined);
        });

        it("bug modal should not return error validating valid data", function() {
            const error = getFakeValidBugObj().validateSync();
            assert.equal(error, undefined);
        });

    });

    describe("getAllBugs method", async function() {

        before(function() {
            sinon.stub(bugModal, 'find');
        });

        it("getAllBugs should call find with empty object", async function() {
            await getAllBugs();
            sinon.assert.calledWith(bugModal.find, {});
        });

        after(function() {
            bugModal.find.restore();
        });
    })
});