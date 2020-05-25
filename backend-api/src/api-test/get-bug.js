const { run } = require('./base');
const { bugModel } = require('../entities/bug');

const fakeBugID = '12345';

const seedData = async () => {
    const bug = new bugModel();
    bug.bugID = fakeBugID;
    bug.title = 'getting this bug';
    bug.actualBehaviour = 'actual behaviour ';
    bug.expectedBehaviour = 'expected behaviour ';
    bug.stepsToReproduce = 'steps to reproduce ';
    bug.reportedBy = 'testuser@gmail.com';
    await bugModel.insertMany([bug]);
};

const cleanSeedData = async () => {
    await bugModel.deleteMany({bugID: fakeBugID});
};

run(async () => {
    await seedData();

    const { getBugHandler } = require('../handlers/bug');
    const expressReq = {
        params: {
            bugID: fakeBugID,
        }
    };
    const expressRes = {
        json: (response) => console.log(response),
    };

    await getBugHandler(expressReq, expressRes);

    await cleanSeedData();
});