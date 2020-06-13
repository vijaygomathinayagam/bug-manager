const sinon = require('sinon');
const { getLoginURLHandler } = require('../../../../src/handlers/user');

describe("user handlers", async function() {

    describe("getLoginURLHandler method", async function() {
        const userEntity = require('../../../../src/entities/user');

        const fakeLoginURL = 'loginURL';

        beforeEach(function() {
            sinon.stub(userEntity, 'getLoginURL').returns(fakeLoginURL);
        })

        it("should call user entity method getLoginURL and call res.send with response", async function() {
            const req = {}, res = {
                json: sinon.stub(),
            };
            await getLoginURLHandler(req, res);
            sinon.assert.calledOnce(userEntity.getLoginURL);
            sinon.assert.calledWith(res.json, { url: fakeLoginURL });
        });

        afterEach(function() {
            userEntity.getLoginURL.restore();
        });
    })
});