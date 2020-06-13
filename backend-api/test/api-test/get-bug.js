const { bugModel } = require('../../src/entities/bug');

const { getFakeValidBug } = require('../_factories/data/bug');
const fakeUserEmail = 'testuser@gmail.com';

const getBug = async () => {
    const bug = getFakeValidBug();
    bug.reportedBy = fakeUserEmail;
    return bug;
};

module.exports = async () => {
    const { getBugHandler } = require('../../src/handlers/bug');
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
};