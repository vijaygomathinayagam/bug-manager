const sinon = require('sinon');
const { getFakeValidBug } = require('../../../_factories/data/bug');

describe("reportedByUserCheckMiddleware method", async function() {

    const notReportedUserEmail = 'testuser1@gmail.com';
    const reportedUserEmail = 'testuser2@gmail.com';

    const bug = getFakeValidBug();
    bug.reportedBy = reportedUserEmail;

    const bugEntity = require('../../../../src/entities/bug');

    let expressReq, expressRes, expressNext;
    let getUserBugAssociationStub;

    before(function() {
        getUserBugAssociationStub = sinon.stub(bugEntity, 'getUserBugAssociation')
            .withArgs(bug, reportedUserEmail).resolves({ isReportedByUser: true })
            .withArgs(bug, notReportedUserEmail).resolves({ isOther: true });
        delete require.cache[require.resolve('../../../../src/middlewares/bug/is-reported-by-user')];
    });

    beforeEach(function() {
        expressReq = {
            params: {},
            locals: {
                bug: bug,
            },
        };
        expressRes = {
            sendStatus: sinon.stub(),
        };
        expressNext = sinon.stub();
    });

    it("should call expressRes.sendStatus with 401, if user association is other than reported by", async function() {
        const isReportedByUserMiddleWare = require('../../../../src/middlewares/bug/is-reported-by-user');

        expressReq.locals.userEmail = notReportedUserEmail;

        await isReportedByUserMiddleWare(expressReq, expressRes, expressNext);
        sinon.assert.calledWith(expressRes.sendStatus, 401);
    });

    it("should call expressNext, if user association is reported by", async function() {
        const isReportedByUserMiddleWare = require('../../../../src/middlewares/bug/is-reported-by-user');

        expressReq.locals.userEmail = reportedUserEmail;

        await isReportedByUserMiddleWare(expressReq, expressRes, expressNext);
        sinon.assert.notCalled(expressRes.sendStatus);
        sinon.assert.called(expressNext);
        sinon.assert.called(getUserBugAssociationStub);
    });

    afterEach(function() {
        expressReq = expressRes = expressNext = undefined;
    });

    after(function() {
        bugEntity.getUserBugAssociation.restore();
    });
});