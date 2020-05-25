const sinon = require('sinon');
const { getFakeValidBugObject } = require('../../_factories/data/bug');

describe("validBugCheckMiddleware method", async function() {

    const { bugModel } = require('../../../src/entities/bug');
    const validBugObject = getFakeValidBugObject();
    const invalidBugObject = {};

    let expresReq, expressRes, expressNext;

    beforeEach(function() {
        expresReq = {
            body: {},
        };
        expressRes = {
            sendStatus: sinon.stub(),
        };
        expressNext = sinon.stub();
        delete require.cache[require.resolve('../../../src/middlewares/bug/is-valid-bug')];
    });

    it("should call expressNext if bug object is valid", async function() {
        expresReq.body = validBugObject;
        const validBugCheckMiddleware = require('../../../src/middlewares/bug/is-valid-bug');
        await validBugCheckMiddleware(expresReq, expressRes, expressNext);
        sinon.assert.called(expressNext);
        sinon.assert.notCalled(expressRes.sendStatus);
    });

    it("shoudl call expressRes.sendStatus with 400, if bug object is invalid", async function() {
        expresReq.body = invalidBugObject;
        const validBugCheckMiddleware = require('../../../src/middlewares/bug/is-valid-bug');
        await validBugCheckMiddleware(expresReq, expressRes, expressNext);
        sinon.assert.notCalled(expressNext);
        sinon.assert.calledWith(expressRes.sendStatus, 400);
    });

    afterEach(function() {
        expresReq = expressRes = expressNext = undefined;
    });
});