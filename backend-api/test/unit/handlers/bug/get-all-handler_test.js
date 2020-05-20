const sinon = require('sinon');
const bugEntity = require('../../../../src/entities/bug');
const { getAllBugsHandler } = require('../../../../src/handlers/bug');

const { getFakeValidBugObj } = require('../../data-factories/bug');

describe("bug handlers", async function() {

    describe("getAllBugsHandler method", async function() {
        const getAllBugsReturnValue = [getFakeValidBugObj()];
        let getAllBugsStub;

        before(function() {
            getAllBugsStub = sinon.stub(bugEntity, 'getAllBugs').callsFake(async () => {
                return getAllBugsReturnValue;
            });
        });

        it("it should call the entity method and return the value from entity method", async function() {
            const expressRes = {
                json: sinon.stub(),
            };
            const expressReq = {};
            await getAllBugsHandler(expressReq, expressRes);
            sinon.assert.calledOnce(getAllBugsStub);
            sinon.assert.calledWith(expressRes.json, getAllBugsReturnValue);
        });

        after(function() {
            bugEntity.getAllBugs.restore();
        });
    });
});