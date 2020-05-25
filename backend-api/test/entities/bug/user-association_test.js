const sinon = require('sinon');
const assert = require('assert');
const { getFakeValidBugObj } = require('../../_factories/data/bug');

describe("getUserBugAssociation method", async function() {

    const reportedByUserBugID = '12345';
    const assingedToUserBugID = '23456';
    const reportedAndAssignedToUserBugID = '34567';
    const otherBugID = '45678';
    const invalidBugID = '56789';
    const serverErrorBugID = '67890';
    const userEmail = 'testuser1@gmail.com';
    const otherUserEmail = 'testuser2@gmail.com';
    const otherErrorString = "other error";
    const { bugModel } = require('../../../src/entities/bug/model');

    let findStub;

    before(function() {
        const reportedByMeBug = getFakeValidBugObj();
        reportedByMeBug.bugID = reportedByUserBugID;
        reportedByMeBug.reportedBy = userEmail;
        reportedByMeBug.assignedTo = otherUserEmail;
        
        const assignedToMeBug = getFakeValidBugObj();
        assignedToMeBug.bugID = assingedToUserBugID;
        assignedToMeBug.assignedTo = userEmail;
        assignedToMeBug.reportedBy = otherUserEmail;

        const reportedAndAssignedToUserBug = getFakeValidBugObj();
        reportedAndAssignedToUserBug.bugID = reportedAndAssignedToUserBugID;
        reportedAndAssignedToUserBug.assignedTo = reportedAndAssignedToUserBug.reportedBy = userEmail;

        const otherUserBug = getFakeValidBugObj();
        otherUserBug.bugID = otherBugID;
        otherUserBug.assignedTo = otherUserBug.reportedBy = otherUserEmail;

        findStub = sinon.stub(bugModel, 'find')
            .withArgs({ bugID: invalidBugID }).rejects({code: 'MODULE_NOT_FOUND'})
            .withArgs({ bugID: serverErrorBugID }).rejects(otherErrorString)
            .withArgs({ bugID: reportedByUserBugID }).resolves(reportedByMeBug)
            .withArgs({ bugID: assingedToUserBugID }).resolves(assignedToMeBug)
            .withArgs({ bugID: reportedAndAssignedToUserBugID }).resolves(reportedAndAssignedToUserBug)
            .withArgs({ bugID: otherBugID }).resolves(otherUserBug);
        delete require.cache[require.resolve('../../../src/entities/bug/user-association')];
    });

    it("should return false as exists when bugID is invalid", async function() {
        const { getUserBugAssociation } = require('../../../src/entities/bug/user-association');
        const actualUserAssociation = await getUserBugAssociation(invalidBugID, userEmail);
        const expectedUserAssociation = { exists: false };
        assert.deepEqual(actualUserAssociation, expectedUserAssociation);
    });

    it("should return true as isReportedByUser in assocciation when bug is reported by user email", async function() {
        const { getUserBugAssociation } = require('../../../src/entities/bug/user-association');
        const actualUserAssociation = await getUserBugAssociation(reportedByUserBugID, userEmail);
        const expectedUserAssociation = { exists: true, association: { isReportedByUser: true } };
        assert.deepEqual(actualUserAssociation, expectedUserAssociation);
    });

    it("should return true as isAssignedToUser in association when bug is assigned to user email", async function() {
        const { getUserBugAssociation } = require('../../../src/entities/bug/user-association');
        const actualUserAssociation = await getUserBugAssociation(assingedToUserBugID, userEmail);
        const expectedUserAssociation = { exists: true, association: { isAssignedToUser: true } };
        assert.deepEqual(actualUserAssociation, expectedUserAssociation);
    });

    it("should return true as isReportedByUser and isAssignedToUser in association when bug is reported and assignted to user email", async function() {
        const { getUserBugAssociation } = require('../../../src/entities/bug/user-association');
        const actualUserAssociation = await getUserBugAssociation(reportedAndAssignedToUserBugID, userEmail);
        const expectedUserAssociation = { exists: true, association: {
                isReportedByUser: true,
                isAssignedToUser: true,
            } 
        };
        assert.deepEqual(actualUserAssociation, expectedUserAssociation);
    });

    it("should return true as isOther in association when bug is not reported or assigned by user email", async function() {
        const { getUserBugAssociation } = require('../../../src/entities/bug/user-association');
        const actualUserAssociation = await getUserBugAssociation(otherBugID, userEmail);
        const expectedUserAssociation = { exists: true, association: { isOther: true }};
        sinon.assert.called(findStub);
        assert.deepEqual(actualUserAssociation, expectedUserAssociation);
    });

    it("should throw error when bug is not reported or assigned by user email", async function() {
        const { getUserBugAssociation } = require('../../../src/entities/bug/user-association');
        try {
            await getUserBugAssociation(serverErrorBugID, userEmail);
        } catch(err) {
            assert.equal(err.name, otherErrorString);
        }
        sinon.assert.called(findStub);
    });

    after(function() {
        bugModel.find.restore();
    });
});