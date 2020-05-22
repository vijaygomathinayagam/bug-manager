const assert = require('assert');
const sinon = require('sinon');
const storage = require('../../../../src/storages').storage;
const {
    RedisSessionValueKeyMapping,
} = require('../../../../src/constants').storageRedis;

describe("isSessionValid method", async function() {

    const fakeExistsSessionValue = 'fakeExistsSessionValue';
    const fakeNotExistsSessionValue = 'fakeNotExistSessionValue';
    
    before(function() {
        const fakeSessionKey = 'fakeSessionKey';

        const hGetAsyncStub = sinon.stub();
        hGetAsyncStub.withArgs(RedisSessionValueKeyMapping, fakeExistsSessionValue).returns(fakeSessionKey);
        hGetAsyncStub.withArgs(RedisSessionValueKeyMapping, fakeNotExistsSessionValue).returns(null);

        delete require.cache[require.resolve('../../../../src/common/session/is-valid')];
        
        storage.redisClient = {
            hgetAsync: hGetAsyncStub,
        };
    });

    it("for existing session value it should return true", async function() {
        const { isSessionValid } = require('../../../../src/common/session/is-valid');
        const actualIsValidSession = await isSessionValid(fakeExistsSessionValue);
        const expectedIsValidSession = true;
        sinon.assert.calledWith(storage.redisClient.hgetAsync.getCall(0), RedisSessionValueKeyMapping, fakeExistsSessionValue);
        assert.equal(actualIsValidSession, expectedIsValidSession);
    });

    it("for non existing session value it should return false", async function() {
        const { isSessionValid } = require('../../../../src/common/session/is-valid');
        const actualIsValidSession = await isSessionValid(fakeNotExistsSessionValue);
        const expectedIsValidSession = false;
        sinon.assert.calledWith(storage.redisClient.hgetAsync.getCall(1), RedisSessionValueKeyMapping, fakeNotExistsSessionValue);
        assert.equal(actualIsValidSession, expectedIsValidSession);
    });

    after(function() {
        storage.redisClient.hgetAsync = undefined;
    });
});