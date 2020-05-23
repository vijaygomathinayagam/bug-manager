const sinon = require('sinon');
const assert = require('assert');
const randomstring = require("randomstring");
const storage = require('../../../src/storages').storage;
const {
    RedisSessionKeyValueMapping,
    RedisSessionValueKeyMapping,
    RedisSessionValueLength
} = require('../../../src/constants').storageRedis;

const deleteSessionObj = require('../../../src/common/session/delete');

describe("createSession method", async function() {
    
    const fakeSessionKey = 'fakeSessionKey';
    const fakeSessionValue = 'fakeSessionValue';
    let deleteSessionStub, generateStub;
    
    before(function() {
        storage.redisClient = {
            hsetAsync: sinon.stub(),
        };
        deleteSessionStub = sinon.stub(deleteSessionObj, 'deleteSession');
        generateStub = sinon.stub(randomstring, 'generate').withArgs(RedisSessionValueLength).returns(fakeSessionValue);

        delete require.cache[require.resolve('../../../src/common/session/create')];
    });
    
    it("generate a random string and save to redis storage", async function() {
        const { createSession } = require('../../../src/common/session/create');
        const actualSessionValue = await createSession(fakeSessionKey);
        const expectedSessionValue = fakeSessionValue;
        
        sinon.assert.calledWith(deleteSessionStub, fakeSessionKey);
        sinon.assert.calledOnce(generateStub);
        sinon.assert.calledWith(storage.redisClient.hsetAsync.getCall(0), RedisSessionKeyValueMapping, fakeSessionKey, fakeSessionValue);
        sinon.assert.calledWith(storage.redisClient.hsetAsync.getCall(1), RedisSessionValueKeyMapping, fakeSessionValue, fakeSessionKey);
        assert.equal(actualSessionValue, expectedSessionValue);
    });

    after(function() {
        storage.redisClient = undefined;
        deleteSessionObj.deleteSession.restore();
        randomstring.generate.restore();
    });
});