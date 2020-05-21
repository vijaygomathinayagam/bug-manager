const randomstring = require("randomstring");
const storage = require('../../storages').storage;
const {
    RedisSessionKeyValueMapping,
    RedisSessionValueKeyMapping,
    RedisSessionValueLength
} = require('../../constants').storageRedis;
const deleteSessionObj = require('./delete');

// also used as refesh
module.exports.createSession = async (sessionKey) => {
    await deleteSessionObj.deleteSession(sessionKey);
    const sessionValue = randomstring.generate(RedisSessionValueLength);
    await storage.redisClient.hsetAsync(RedisSessionKeyValueMapping, sessionKey, sessionValue);
    await storage.redisClient.hsetAsync(RedisSessionValueKeyMapping, sessionValue, sessionKey);
    return sessionValue;
};