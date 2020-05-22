const { redisClient } = require('../../storages').storage;
const {
    RedisSessionKeyValueMapping,
    RedisSessionValueKeyMapping
} = require('../../constants').storageRedis;

module.exports.deleteSession = async (sessionKey) => {
    const sessionValue = await redisClient.hgetAsync(RedisSessionKeyValueMapping, sessionKey);
    if (sessionValue != null) {
        await redisClient.hdelAsync(RedisSessionKeyValueMapping, sessionKey);
        await redisClient.hdelAsync(RedisSessionValueKeyMapping, sessionValue);
    }
};