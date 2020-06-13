const assignedToUserEmail = 'testuser@gmail.com';
const { bugModel } = require('../../src/entities/bug');

const { getFakeValidBug } = require('../_factories/data/bug');

const seedData = async () => {
    const bugs = [];

    for (let i = 0; i < 50; i++) {
        const bug = getFakeValidBug();
        bug.bugID = i;
        bug.title = `title ${i}`;
        bug.actualBehaviour = 'actual behaviour ' + i;
        bug.expectedBehaviour = 'expected behaviour ' + i;
        bug.stepsToReproduce = 'steps to reproduce ' + i;
        bug.reportedBy = 'testuser1@gmail.com';
        bug.assignedTo = assignedToUserEmail;
        bugs.push(bug);
    }
    await bugModel.insertMany(bugs);
};

const cleanSeedData = async () => {
    await bugModel.deleteMany({});
};

module.exports = async () => {
    await seedData();

    const { getAllBugsHandler } = require('../../src/handlers/bug');
    const expressReq = {
        query: {
            filter: `{"assignedTo": "${assignedToUserEmail}"}`
        }
    };
    const expressRes = {
        json: (response) => console.log(response), 
    };
    
    await getAllBugsHandler(expressReq, expressRes);

    await cleanSeedData();
};