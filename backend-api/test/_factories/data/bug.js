const { bugModel } = require('../../../src/entities/bug');

const getFakeValidBugObject = () => {
    const fakeBugObject = {};
    fakeBugObject.title = 'Customers title spelling is wrong in customer list page';
    fakeBugObject.bugID = '12345';
    fakeBugObject.actualBehaviour = 'title is displaying as "Costomers"';
    fakeBugObject.expectedBehaviour = 'title should be "Customers"';
    fakeBugObject.stepsToReproduce = '1. Login\n2. Click customers nav link';
    fakeBugObject.reportedBy = 'testuser@gmail.com';
    return fakeBugObject;
};

const getFakeValidBug = () => {
    return bugModel.getBugFromObject(getFakeValidBugObject());
};

const getFakeInvalidBugObjEmpty = () => {
    const fakeBug = new bugModel();
    return fakeBug;
};


module.exports = {
    getFakeValidBugObject,
    getFakeValidBug,
    getFakeInvalidBugObjEmpty
};