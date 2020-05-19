const { bugModal } = require('../../../src/entities/bug');

const getFakeValidBugObj = () => {
    const fakeBug = new bugModal();
    fakeBug.title = 'Customers title spelling is wrong in customer list page';
    fakeBug.bugID = '12345';
    fakeBug.actualBehaviour = 'title is displaying as "Costomers"';
    fakeBug.expectedBehaviour = 'title should be "Customers"';
    fakeBug.stepsToReproduce = '1. Login\n2. Click customers nav link';
    fakeBug.reportedBy = 'testuser@gmail.com';
    return fakeBug;
};

const getFakeInvalidBugObjEmpty = () => {
    const fakeBug = new bugModal();
    return fakeBug;
};


module.exports = {
    getFakeValidBugObj,
    getFakeInvalidBugObjEmpty
};