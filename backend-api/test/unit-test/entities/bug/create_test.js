const sinon = require('sinon');
const { getFakeValidBug } = require('../../../_factories/data/bug');

describe("createBug method", async function() {

    const { bugModel } = require('../../../../src/entities/bug/model');
    let insertManyStub;

    before(function() {
        insertManyStub = sinon.stub(bugModel, 'insertMany');
        delete require.cache[require.resolve('../../../../src/entities/bug/create')];
    });

    it("should call bugModel insertMany method with argument bug object", async function() {
        const createBug = require('../../../../src/entities/bug/create');
        const bug = getFakeValidBug();
        await createBug(bug);
        sinon.assert.calledWith(insertManyStub, [ bug ]);
    });

    after(function() {
        bugModel.insertMany.restore();
    });
});