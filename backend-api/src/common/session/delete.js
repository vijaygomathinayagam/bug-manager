const { redisClient } = require('../../storages').storage;
const {
    RedisSessionKeyValueMapping,
    RedisSessionValueKeyMapping
} = require('../../constants').storageRedis;

module.exports.deleteSession = async (sessionKey) => {
    const sessionValue = await redisClient.hgetAsync(RedisSessionKeyValueMapping, sessionKey);
    await redisClient.hdelAsync(RedisSessionKeyValueMapping, sessionValue);
    if (sessionValue) {
        await redisClient.hdelAsync(RedisSessionValueKeyMapping, sessionValue);
    }
};