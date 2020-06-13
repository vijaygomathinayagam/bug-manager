const sinon = require('sinon');
const { getFakeValidBug } = require('../../../_factories/data/bug');

describe("createBugHandler method", async function() {

    const bugEntity = require('../../../../src/entities/bug');

    let createBugStub;
    let expressReq, expressRes;

    before(function() {
        createBugStub = sinon.stub(bugEntity, 'createBug');
        delete require.cache[require.resolve('../../../../src/handlers/bug/create-handler')];
    });

    beforeEach(function() {
        expressReq = {
            locals: {
                bug: getFakeValidBug(),
            }
        };
        expressRes = {
            json: sinon.stub(),
        }
    });

    it("should call entity method and return true as isSuccess", async function() {
        const createBugHandler = require('../../../../src/handlers/bug/create-handler');
        await createBugHandler(expressReq, expressRes);
        sinon.assert.calledWith(createBugStub, expressReq.locals.bug);
        sinon.assert.calledWith(expressRes.json, {
            isSuccess: true,
        });
    });

    afterEach(function() {
        expressReq = expressRes = undefined;
    });

    after(function() {
        bugEntity.createBug.restore();
    });
});