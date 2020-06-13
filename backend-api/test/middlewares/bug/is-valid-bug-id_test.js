const sinon = require('sinon');
const { getFakeValidBug } = require('../../_factories/data/bug');
const assert = require('assert');

describe("validBugIDCheckMiddleware method", async function() {
    const validBugID = '12345';
    const invalidBugID = '23456';

    const bugEntity = require('../../../src/entities/bug');

    let expressReq, expresssRes, expressNext;

    before(function() {
        sinon.stub(bugEntity, 'getBug')
            .withArgs(validBugID).resolves({ exists: true, bug: getFakeValidBug() })
            .withArgs(invalidBugID).resolves({ exists: false });
    });

    beforeEach(function() {
        expressReq = {
            params: {},
            locals: {},
        };
        expresssRes = {
            sendStatus: sinon.stub(),
        };
        expressNext = sinon.stub();
        delete require.cache[require.resolve('../../../src/middlewares/bug/is-valid-bug-id')];
    });

    it("should call next for valid bug ID", async function() {
        const { bugModel } = require('../../../src/entities/bug');
        const validBugIDCheckMiddleware = require('../../../src/middlewares/bug/is-valid-bug-id');

        expressReq.params.bugID = validBugID;
        await validBugIDCheckMiddleware(expressReq, expresssRes, expressNext);

        assert(expressReq.locals.bug instanceof bugModel);
        sinon.assert.called(expressNext);
        sinon.assert.notCalled(expresssRes.sendStatus);
        sinon.assert.calledWith(bugEntity.getBug, validBugID);
    });

    it("return 400 for invalid bug ID", async function() {
        const validBugIDCheckMiddleware = require('../../../src/middlewares/bug/is-valid-bug-id');

        expressReq.params.bugID = invalidBugID;

        await validBugIDCheckMiddleware(expressReq, expresssRes, expressNext);
        sinon.assert.calledWith(expresssRes.sendStatus, 400);
        sinon.assert.notCalled(expressNext);
        sinon.assert.calledWith(bugEntity.getBug, invalidBugID);
    });

    afterEach(function() {
        expressReq = expresssRes = expressNext = undefined;
    });

    after(function() {
        bugEntity.getBug.restore();
    });
});