const assert = require('assert');
const { getFakeValidBug } = require('../../_factories/data/bug');

describe("getAssociation method", async function() {

    const userEmail = 'testuser1@gmail.com';
    let reportedByMeBug, assignedToMeBug, reportedAndAssignedToUserBug, otherUserBug;

    before(function() {
        const reportedByUserBugID = '12345';
        const assingedToUserBugID = '23456';
        const reportedAndAssignedToUserBugID = '34567';
        const otherBugID = '45678';

        const otherUserEmail = 'testuser2@gmail.com';

        reportedByMeBug = getFakeValidBug();
        reportedByMeBug.bugID = reportedByUserBugID;
        reportedByMeBug.reportedBy = userEmail;
        reportedByMeBug.assignedTo = otherUserEmail;
        
        assignedToMeBug = getFakeValidBug();
        assignedToMeBug.bugID = assingedToUserBugID;
        assignedToMeBug.assignedTo = userEmail;
        assignedToMeBug.reportedBy = otherUserEmail;

        reportedAndAssignedToUserBug = getFakeValidBug();
        reportedAndAssignedToUserBug.bugID = reportedAndAssignedToUserBugID;
        reportedAndAssignedToUserBug.assignedTo = reportedAndAssignedToUserBug.reportedBy = userEmail;

        otherUserBug = getFakeValidBug();
        otherUserBug.bugID = otherBugID;
        otherUserBug.assignedTo = otherUserBug.reportedBy = otherUserEmail;
        delete require.cache[require.resolve('../../../src/entities/bug/user-association')];
    });

    it("should return true as isReportedByUser in assocciation when bug is reported by user email", async function() {
        const getUserBugAssociation = require('../../../src/entities/bug/user-association');
        const actualUserAssociation = await getUserBugAssociation(reportedByMeBug, userEmail);
        const expectedUserAssociation = { isReportedByUser: true };
        assert.deepEqual(actualUserAssociation, expectedUserAssociation);
    });

    it("should return true as isAssignedToUser in association when bug is assigned to user email", async function() {
        const getUserBugAssociation = require('../../../src/entities/bug/user-association');
        const actualUserAssociation = await getUserBugAssociation(assignedToMeBug, userEmail);
        const expectedUserAssociation = { isAssignedToUser: true };
        assert.deepEqual(actualUserAssociation, expectedUserAssociation);
    });

    it("should return true as isReportedByUser and isAssignedToUser in association when bug is reported and assignted to user email", async function() {
        const getUserBugAssociation = require('../../../src/entities/bug/user-association');
        const actualUserAssociation = await getUserBugAssociation(reportedAndAssignedToUserBug, userEmail);
        const expectedUserAssociation = {
            isReportedByUser: true,
            isAssignedToUser: true,
        };
        assert.deepEqual(actualUserAssociation, expectedUserAssociation);
    });

    it("should return true as isOther in association when bug is not reported or assigned by user email", async function() {
        const getUserBugAssociation = require('../../../src/entities/bug/user-association');
        const actualUserAssociation = await getUserBugAssociation(otherUserBug, userEmail);
        const expectedUserAssociation = { isOther: true };
        assert.deepEqual(actualUserAssociation, expectedUserAssociation);
    });
});