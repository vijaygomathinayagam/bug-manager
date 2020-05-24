const sinon = require('sinon');

describe("reportedByUserCheckMiddleWare method", async function() {

    const notExistsBugID = '12345';
    const existsBugID = '23456';
    const notReportedUserEmail = 'testuser1@gmail.com';
    const reportedUserEmail = 'testuser2@gmail.com';
    const userEmail = 'testuser3@gmail.com';

    const bugEntity = require('../../../src/entities/bug');

    let expressReq, expressRes, expressNext;
    let getUserBugAssociationStub;

    before(function() {
        getUserBugAssociationStub = sinon.stub(bugEntity, 'getUserBugAssociation')
            .withArgs(notExistsBugID, userEmail).resolves({ exists: false })
            .withArgs(existsBugID, reportedUserEmail).resolves({ exists: true, association: { isReportedByUser: true }})
            .withArgs(existsBugID, notReportedUserEmail).resolves({ exists: true, association: { isOther: true }});
        delete require.cache[require.resolve('../../../src/middlewares/bug/is-reported-by-user')];
    });

    beforeEach(function() {
        expressReq = {
            params: {},
            locals: {},
        };
        expressRes = {
            sendStatus: sinon.stub(),
        };
        expressNext = sinon.stub();
    });

    it("should call expressRes.sendStatus with 400, if user association exists is false", async function(){
        const isReportedByUserMiddleWare = require('../../../src/middlewares/bug/is-reported-by-user');
        expressReq.params.bugID = notExistsBugID;
        expressReq.locals.userEmail = userEmail;
        await isReportedByUserMiddleWare(expressReq, expressRes, expressNext);
        sinon.assert.calledWith(expressRes.sendStatus, 400);
    });

    it("should call expressRes.sendStatus with 401, if user association is other than reported by", async function() {
        const isReportedByUserMiddleWare = require('../../../src/middlewares/bug/is-reported-by-user');
        expressReq.params.bugID = existsBugID;
        expressReq.locals.userEmail = notReportedUserEmail;
        await isReportedByUserMiddleWare(expressReq, expressRes, expressNext);
        sinon.assert.calledWith(expressRes.sendStatus, 401);
    });

    it("should call expressNext, if user association is reported by", async function() {
        const isReportedByUserMiddleWare = require('../../../src/middlewares/bug/is-reported-by-user');
        expressReq.params.bugID = existsBugID;
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