const sinon = require('sinon');
const bugEntity = require('../../../../src/entities/bug');
const { getAllBugsHandler } = require('../../../../src/handlers/bug');

const { getFakeValidBug } = require('../../../_factories/data/bug');

describe("bug handlers", async function() {

    describe("getAllBugsHandler method", async function() {
        const getAllBugsReturnValue = { bugs: [getFakeValidBug()], totalCount: 1 };
        let getAllBugsStub;

        before(function() {
            getAllBugsStub = sinon.stub(bugEntity, 'getAllBugs').callsFake(async () => {
                return getAllBugsReturnValue;
            });
        });

        it("it should call the entity method and return the value from entity method", async function() {
            const filter = {
                assignedTo: 'testuser@gmail.com',
            };
            const expressReq = {
                query: {
                    filter: JSON.stringify(filter),
                }
            };
            const expressRes = {
                json: sinon.stub(),
            };

            await getAllBugsHandler(expressReq, expressRes);
            sinon.assert.calledWith(getAllBugsStub, filter);
            sinon.assert.calledWith(expressRes.json, getAllBugsReturnValue);
        });

        after(function() {
            bugEntity.getAllBugs.restore();
        });
    });
});