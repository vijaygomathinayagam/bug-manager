const sinon = require('sinon');
const storage = require('../../../src/storages').storage;
const {
    RedisSessionKeyValueMapping,
    RedisSessionValueKeyMapping,
} = require('../../../src/constants').storageRedis;

describe("deleteSession method", async function() {

    const fakeExistingSessionKey = 'fakeExistingSessionKey';
    const fakeNonExistingSessionKey = 'fakeNonExistingSessionKey';
    const fakeSesionValue = 'fakeSessionValue';

    before(function() {
        const hgetAsyncStub = sinon.stub();
        hgetAsyncStub.withArgs(RedisSessionKeyValueMapping, fakeNonExistingSessionKey).resolves(null);
        hgetAsyncStub.withArgs(RedisSessionKeyValueMapping, fakeExistingSessionKey).resolves(fakeSesionValue);

        storage.redisClient = {
            hgetAsync: hgetAsyncStub,
            hdelAsync: sinon.stub(),
        };
        delete require.cache[require.resolve('../../../src/common/session/delete')];
    });

    it("should not call delete mapping in redis for non existing sessionKey", async function() {
        const { deleteSession } = require('../../../src/common/session/delete');
        await deleteSession(fakeNonExistingSessionKey);
        sinon.assert.calledWith(storage.redisClient.hgetAsync.getCall(0), RedisSessionKeyValueMapping, fakeNonExistingSessionKey);
        sinon.assert.notCalled(storage.redisClient.hdelAsync);
    });

    it("should call delete mapping in redis for existing sessionKey", async function() {
        const { deleteSession } = require('../../../src/common/session/delete');
        await deleteSession(fakeExistingSessionKey);
        sinon.assert.calledWith(storage.redisClient.hgetAsync.getCall(1), RedisSessionKeyValueMapping, fakeExistingSessionKey);
        sinon.assert.calledWith(storage.redisClient.hdelAsync, RedisSessionKeyValueMapping, fakeExistingSessionKey);
        sinon.assert.calledWith(storage.redisClient.hdelAsync, RedisSessionValueKeyMapping, fakeSesionValue);
    });

    after(function() {
        storage.redisClient = undefined;
    });
});