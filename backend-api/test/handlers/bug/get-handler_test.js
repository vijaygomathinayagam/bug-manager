const sinon = require('sinon');
const { getFakeValidBug } = require('../../_factories/data/bug');

describe("getBugHandler method", async function() {

    const existsBugID = '12345';
    const notExistsBugID = '23456';
    const bug = getFakeValidBug();
    const bugEntity = require('../../../src/entities/bug');

    let expressReq, expressRes;

    before(function() {
        sinon.stub(bugEntity, 'getBug')
            .withArgs(existsBugID).resolves({ exists: true, bug: bug })
            .withArgs(notExistsBugID).resolves({ exists: false });

        delete require.cache[require.resolve('../../../src/handlers/bug/get-handler')];
    });

    beforeEach(function() {
        expressReq = {
            params: {}
        };
        expressRes = {
            sendStatus: sinon.stub(),
            json: sinon.stub(),
        };
    });

    it("should call expressRes.json with return bug obj from getBug entity method when exists is true", async function() {
        expressReq.params.bugID = existsBugID;

        const getBugHandler = require('../../../src/handlers/bug/get-handler');
        await getBugHandler(expressReq, expressRes);
        sinon.assert.calledWith(expressRes.json, { bug: bug });
        sinon.assert.notCalled(expressRes.sendStatus);
    });

    it("should call expressRes.sendStatus with 400 when exits is false", async function() {
        expressReq.params.bugID = notExistsBugID;

        const getBugHandler = require('../../../src/handlers/bug/get-handler');
        await getBugHandler(expressReq, expressRes);
        sinon.assert.notCalled(expressRes.json);
        sinon.assert.calledWith(expressRes.sendStatus, 400);
    });

    afterEach(function() {
        expressReq = expressRes = undefined;
    });

    after(function() {
        bugEntity.getBug.restore();
    });
});