const sinon = require('sinon');
const { getFakeValidBug } = require('../../_factories/data/bug');

describe("getBugHandler method", async function() {

    const userEmail = 'testuser1@gmail.com';
    const bug = getFakeValidBug();
    bug.reportedBy = userEmail;
    const bugEntity = require('../../../src/entities/bug');

    let expressReq, expressRes;
    let getUserBugAssociationStub;

    before(function() {
        getUserBugAssociationStub = sinon.stub(bugEntity, 'getUserBugAssociation')
            .withArgs(bug, userEmail).resolves({ isReportedByUser: true });

        delete require.cache[require.resolve('../../../src/handlers/bug/get-handler')];
    });

    beforeEach(function() {
        expressReq = {
            locals: {
                userEmail: userEmail,
                bug: bug,
            },
        };
        expressRes = {
            json: sinon.stub(),
        };
    });

    it("should call expressRes.json with return bug obj from getBug entity method when exists is true", async function() {
        const getBugHandler = require('../../../src/handlers/bug/get-handler');
        await getBugHandler(expressReq, expressRes);
        sinon.assert.called(getUserBugAssociationStub);
        sinon.assert.calledWith(expressRes.json, { bug: bug, userAssociation: { isReportedByUser: true } });
    });

    afterEach(function() {
        expressReq = expressRes = undefined;
    });

    after(function() {
        bugEntity.getUserBugAssociation.restore();
    });
});