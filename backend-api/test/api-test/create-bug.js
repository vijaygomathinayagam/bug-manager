const { bugModel } = require('../../src/entities/bug');

const { getFakeValidBug } = require('../_factories/data/bug');

const fakeBugID = '12345';

const getBugObj = () => {
    const bug = getFakeValidBug();
    bug.bugID = fakeBugID;
    return bug;
};

const cleanSeedData = async () => {
    await bugModel.deleteMany({bugID: fakeBugID});
};

module.exports = async () => {
    const { createBugHandler } = require('../../src/handlers/bug');
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
};