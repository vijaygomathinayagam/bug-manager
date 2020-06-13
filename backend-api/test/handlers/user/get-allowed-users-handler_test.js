const sinon = require('sinon');

describe("getAllowedUsersHandler method", async function() {
    const userEntity = require('../../../src/entities/user');

    const allowedUsersList = [ "testuser@gmail.com" ];

    let expressReq, expressRes;

    beforeEach(function() {
        sinon.stub(userEntity, 'getAllowedUsers').returns(allowedUsersList);
        expressReq = {};
        expressRes = {
            json: sinon.stub(),
        };
    });

    it("should call entity method and pass its return value in res.json", async function() {
        const getAllowedUsersHandler = require('../../../src/handlers/user/get-allowed-users-handler');
        await getAllowedUsersHandler(expressReq, expressRes);
        sinon.assert.called(userEntity.getAllowedUsers);
        sinon.assert.calledWith(expressRes.json, {
            users: allowedUsersList
        });
    });

    afterEach(function() {
        userEntity.getAllowedUsers.restore();
    });
});