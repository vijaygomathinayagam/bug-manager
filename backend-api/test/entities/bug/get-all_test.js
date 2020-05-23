const sinon = require('sinon');
const assert = require('assert');
const { bugModel } = require('../../../src/entities/bug/modal');
const { getFakeValidBugObj } = require('../../_factories/data/bug');

describe("getAllBugs method", async function() {

    let selectStub, sortStub, limitStub;
    const fakeDocumentCount = 25;

    before(async function() {
        sinon.stub(bugModel, 'find').callsFake(() => ({
            limit: limitStub,
        }));
        limitStub = sinon.stub().callsFake(() => ({
            sort: sortStub,
        }));
        sortStub = sinon.stub().callsFake(() => ({
            select: selectStub,
        }));
        selectStub = sinon.stub();
        sinon.stub(bugModel, 'countDocuments').callsFake(async () => fakeDocumentCount);
    });
    
    it("getAllBugs should call find with necessary options", async function() {
        const filter = {
            'assignedTo': 'testuser@gmail.com'
        };
        const bugsArr = Array(10).fill(getFakeValidBugObj());
        const expectedResonse = {
            bugs: bugsArr,
            totalCount: fakeDocumentCount,
        };
        selectStub.callsFake(async () => bugsArr);
        const { getAllBugs } = require('../../../src/entities/bug'); 
        const actualResponse = await getAllBugs(filter);
        sinon.assert.calledWith(bugModel.find, filter);
        sinon.assert.calledOnce(bugModel.countDocuments);
        sinon.assert.calledWith(limitStub, 10);
        sinon.assert.calledWith(sortStub, { createdAt: -1 });
        sinon.assert.calledWith(selectStub, { bugId: 1, title: 1, reportedBy: 1, assignedBy: 1});
        assert.deepEqual(actualResponse, expectedResonse);
    });

    after(function() {
        bugModel.find.restore();
        bugModel.countDocuments.restore();
    });
});