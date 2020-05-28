const { run } = require('./base');
const { bugModel } = require('../entities/bug');

const fakeBugID = '12345';

const getBugObj = () => {
    const bug = new bugModel();
    bug.bugID = fakeBugID;
    bug.title = 'getting this bug';
    bug.actualBehaviour = 'actual behaviour ';
    bug.expectedBehaviour = 'expected behaviour ';
    bug.stepsToReproduce = 'steps to reproduce ';
    bug.reportedBy = 'testuser@gmail.com';
    return bug;
};

const cleanSeedData = async () => {
    await bugModel.deleteMany({bugID: fakeBugID});
};

run(async () => {
    const { createBugHandler } = require('../handlers/bug');
    const expressReq = {
        locals: {
            bug: getBugObj(),
        },
    };
    const expressRes = {
        json: (response) => console.log(response),
    };

    await createBugHandler(expressReq, expressRes);
    console.log(await bugModel.find({ bugID: fakeBugID }));

    await cleanSeedData();
});