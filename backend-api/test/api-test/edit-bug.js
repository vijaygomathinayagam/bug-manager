const { bugModel } = require('../../src/entities/bug');

const { getFakeValidBug } = require('../_factories/data/bug');

const fakeBugID = '12345';

const seedAndGetBug = async () => {
    const bug = getFakeValidBug();
    bug.bugID = fakeBugID;
    
    bugModel.insertMany([ bug ]);
    return bug;
};

const cleanSeedData = async () => {
    await bugModel.deleteMany({bugID: fakeBugID});
};

module.exports = async () => {
    const { editBugHandler } = require('../../src/handlers/bug');
    const expressReq = {
        locals: {
            bug: await seedAndGetBug(),
        },
        body: {
            expectedBehaviour: 'expected behaviour changed',
        }
    };
    const expressRes = {
        json: (response) => console.log(response),
    };

    await editBugHandler(expressReq, expressRes);
    console.log(await bugModel.find({ bugID: fakeBugID }));

    await cleanSeedData();
};