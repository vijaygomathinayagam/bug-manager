const { run } = require('./base');
const { bugModel } = require('../entities/bug');

const fakeBugID = '12345';

const seedData = async () => {
    const bug = new bugModel();
    bug.bugID = fakeBugID;
    bug.title = 'bug to be deleted';
    bug.actualBehaviour = 'actual behaviour ';
    bug.expectedBehaviour = 'expected behaviour ';
    bug.stepsToReproduce = 'steps to reproduce ';
    bug.reportedBy = 'testuser1@gmail.com';
    bug.assignedTo = 'testuser2@gmail.com';
    await bugModel.insertMany([bug]);
};

const cleanSeedData = async () => {
    await bugModel.deleteMany({bugID: fakeBugID});
};

run(async () => {
    await seedData();

    const { deleteBugHandler } = require('../handlers/bug');
    const expressReq = {
        params: {
            bugID: fakeBugID,
        }
    };
    const expressRes = {
        json: (response) => console.log(response), 
    };

    console.log(await bugModel.find({}));
    await deleteBugHandler(expressReq, expressRes);
    console.log(await bugModel.find({}));
    
    await cleanSeedData();
});