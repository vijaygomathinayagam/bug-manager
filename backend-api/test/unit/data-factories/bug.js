const { bugModal } = require('../../../src/entities/bug');

const getFakeValidBugObj = () => {
    const fakeBug = new bugModal();
    fakeBug.title = 'sample bug 1';
    fakeBug.bugID = '12345';
    return fakeBug;
};

const getFakeInvalidBugObjEmpty = () => {
    const fakeBug = new bugModal();
    return fakeBug;
};

const getFakeInvalidBugObjOnlyBugID = () => {
    const fakeBug = new bugModal();
    fakeBug.bugID = '12345';
    return fakeBug;
};

const getFakeInvalidBugObjOnlyTitle = () => {
    const fakeBug = new bugModal();
    fakeBug.title = 'sample bug 1';
    return fakeBug;
};

module.exports = {
    getFakeValidBugObj,
    getFakeInvalidBugObjEmpty,
    getFakeInvalidBugObjOnlyBugID,
    getFakeInvalidBugObjOnlyTitle
};