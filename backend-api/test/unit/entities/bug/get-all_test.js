const sinon = require('sinon');
const { bugModal, getAllBugs } = require('../../../../src/entities/bug');

describe("getAllBugs method", async function() {

    let selectStub, sortStub, limitStub;
    let filter;

    before(async function() {
        sinon.stub(bugModal, 'find').callsFake(() => ({
            limit: limitStub,
        }));
        const selectStub = sinon.stub();
        const sortStub = sinon.stub().callsFake(() => ({
            select: selectStub,
        }));
        const limitStub = sinon.stub().callsFake(() => ({
            sort: sortStub,
        }));
        filter = {
            assignedTo: ['testuser@gmail.com']
        };
        {
            $or: [{
                assignedTo: 'testuser@gmail.com'
            }]
        }

        await getAllBugs(filter);
    });

    it("getAllBugs should call find with empty object", async function() {
        sinon.assert.calledWith(bugModal.find, filter);
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
});