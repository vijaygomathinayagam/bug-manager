const sinon = require('sinon');
const assert = require('assert');
const { bugModal, getAllBugs } = require('../../../src/entities/bug');

describe("bug entity methods", async function() {

    describe("bug model", async function() {

        it("bug modal should return error validating invalid data", function() {
            const invalidBugObj = new bugModal();
            const error = invalidBugObj.validateSync();
            assert.notEqual(error.errors.title, undefined);
            assert.notEqual(error.errors.bugID, undefined);
        });

        it("bug modal should not return error validating valid data", function() {
            const validBugObj = new bugModal();
            validBugObj.title = 'sample bug title';
            validBugObj.bugID = '12345';
            const error = validBugObj.validateSync();
            assert.equal(error, undefined);
        })

    });

    describe("getAllBugs method", async function() {

        beforeEach(function() {
            sinon.stub(bugModal, 'find');
        });

        it("getAllBugs should call find with empty object", async function() {
            await getAllBugs();
            sinon.assert.calledWith(bugModal.find, {});
        });

        afterEach(function() {
            bugModal.find.restore();
        });
    })
});