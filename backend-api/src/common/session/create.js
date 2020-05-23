const randomstring = require("randomstring");
const { redisClient } = require('../../storages').storage;
const {
    RedisSessionKeyValueMapping,
    RedisSessionValueKeyMapping,
    RedisSessionValueLength
} = require('../../constants').storageRedis;
const { deleteSession } = require('./delete');

// also used as refesh
module.exports.createSession = async (sessionKey) => {
    await deleteSession(sessionKey);
    const sessionValue = randomstring.generate(RedisSessionValueLength);
    await redisClient.hsetAsync(RedisSessionKeyValueMapping, sessionKey, sessionValue);
    await redisClient.hsetAsync(RedisSessionValueKeyMapping, sessionValue, sessionKey);
    return sessionValue;
};