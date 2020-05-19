const sinon = require('sinon');
const assert = require('assert');
const { bugModal, getAllBugs } = require('../../../src/entities/bug');
const {
    getFakeValidBugObj,
    getFakeInvalidBugObjEmpty,
} = require('../data-factories/bug');

describe("bug entity methods", async function() {

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

    describe("getAllBugs method", async function() {

        const selectStub = sinon.stub();
        const sortStub = sinon.stub().callsFake(() => ({
            select: selectStub,
        }));
        const limitStub = sinon.stub().callsFake(() => ({
            sort: sortStub,
        }));

        before(async function() {
            sinon.stub(bugModal, 'find').callsFake(() => ({
                limit: limitStub,
            }));
            await getAllBugs();
        });

        it("getAllBugs should call find with empty object", async function() {
            sinon.assert.calledWith(bugModal.find, {});
        });

        it("getAllBugs should call limit with 10", async function() {
            sinon.assert.calledWith(limitStub, 10);
        });

        it("getAllBugs should call sort with updatedAt descending", async function() {
            sinon.assert.calledWith(sortStub, { createdAt: -1 });
        });

        it("getAllBugs should call select with bugID, title, assignedTo and reportedBy columns", async function() {
            sinon.assert.calledWith(selectStub, { bugId: 1, title: 1, reportedBy: 1, assignedBy: 1});
        });

        after(function() {
            bugModal.find.restore();
        });
    })
});