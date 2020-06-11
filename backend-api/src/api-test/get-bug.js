const { run } = require('./base');
const { bugModel } = require('../entities/bug');

const fakeUserEmail = 'testuser@gmail.com';

const getBug = async () => {
    const bug = new bugModel();
    bug.bugID = '12345';
    bug.title = 'getting this bug';
    bug.actualBehaviour = 'actual behaviour ';
    bug.expectedBehaviour = 'expected behaviour ';
    bug.stepsToReproduce = 'steps to reproduce ';
    bug.reportedBy = fakeUserEmail;
    return bug;
};

run(async () => {
    const { getBugHandler } = require('../handlers/bug');
    const expressReq = {
        locals: {
            bug: await getBug(),
            userEmail: fakeUserEmail,
        }
    };
    const expressRes = {
        json: (response) => console.log(response),
    };

    await getBugHandler(expressReq, expressRes);
});