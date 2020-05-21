const sinon = require('sinon');
const { bugModel } = require('../../../../src/entities/bug/modal');

describe("getAllBugs method", async function() {

    let selectStub, sortStub, limitStub;

    before(async function() {
        sinon.stub(bugModel, 'find').callsFake(() => ({
            limit: limitStub,
        }));
        selectStub = sinon.stub();
        sortStub = sinon.stub().callsFake(() => ({
            select: selectStub,
        }));
        limitStub = sinon.stub().callsFake(() => ({
            sort: sortStub,
        }));
        
        const { getAllBugs } = require('../../../../src/entities/bug'); 
        await getAllBugs();
    });

    it("getAllBugs should call find with empty object", async function() {
        sinon.assert.calledWith(bugModel.find, {});
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
        bugModel.find.restore();
    });
});