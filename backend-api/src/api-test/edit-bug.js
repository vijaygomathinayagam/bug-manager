const { run } = require('./base');
const { bugModel } = require('../entities/bug');

const fakeBugID = '12345';

const seedAndGetBug = async () => {
    const bug = new bugModel();
    bug.bugID = '12345';
    bug.title = 'getting this bug';
    bug.actualBehaviour = 'actual behaviour ';
    bug.expectedBehaviour = 'expected behaviour ';
    bug.stepsToReproduce = 'steps to reproduce ';
    bug.reportedBy = 'testuser@gmail.com';
    bugModel.insertMany([ bug ]);
    return bug;
};

const cleanSeedData = async () => {
    await bugModel.deleteMany({bugID: fakeBugID});
};

run(async () => {
    const { editBugHandler } = require('../handlers/bug');
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
});