const { bugModel } = require('../../src/entities/bug');

const { getFakeValidBug } = require('../_factories/data/bug');

const fakeBugID = '12345';

const seedData = async () => {
    const bug = getFakeValidBug();
    bug.bugID = fakeBugID;
    
    await bugModel.insertMany([bug]);
};

const cleanSeedData = async () => {
    await bugModel.deleteMany({bugID: fakeBugID});
};

module.exports = async () => {
    await seedData();

    const { deleteBugHandler } = require('../../src/handlers/bug');
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
};