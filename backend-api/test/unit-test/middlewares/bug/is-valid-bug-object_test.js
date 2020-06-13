const sinon = require('sinon');
const assert = require('assert');
const { getFakeValidBugObject } = require('../../../_factories/data/bug');

describe("validBugObjectCheckMiddleware method", async function() {

    const { bugModel } = require('../../../../src/entities/bug');
    const validBugObject = getFakeValidBugObject();
    const invalidBugObject = {};

    let expressReq, expressRes, expressNext;

    beforeEach(function() {
        expressReq = {
            body: {},
            locals: {}
        };
        expressRes = {
            sendStatus: sinon.stub(),
        };
        expressNext = sinon.stub();
        delete require.cache[require.resolve('../../../../src/middlewares/bug/is-valid-bug-object')];
    });

    it("should call expressNext if bug object is valid", async function() {
        expressReq.body = validBugObject;
        const validBugObjectCheckMiddleware = require('../../../../src/middlewares/bug/is-valid-bug-object');
        await validBugObjectCheckMiddleware(expressReq, expressRes, expressNext);
        assert(expressReq.locals.bug instanceof bugModel);
        sinon.assert.called(expressNext);
        sinon.assert.notCalled(expressRes.sendStatus);
    });

    it("shoudl call expressRes.sendStatus with 400, if bug object is invalid", async function() {
        expressReq.body = invalidBugObject;
        const validBugObjectCheckMiddleware = require('../../../../src/middlewares/bug/is-valid-bug-object');
        await validBugObjectCheckMiddleware(expressReq, expressRes, expressNext);
        sinon.assert.notCalled(expressNext);
        sinon.assert.calledWith(expressRes.sendStatus, 400);
    });

    afterEach(function() {
        expressReq = expressRes = expressNext = undefined;
    });
});