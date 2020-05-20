const { redisClient } = require('../../storages').storage;
const {
    RedisSessionValueKeyMapping
} = require('../../constants').storageRedis;

module.exports.isSessionValid = async (sessionValue) => {
    const value = redisClient.hgetAsync(RedisSessionValueKeyMapping, sessionValue);
    return value != null;
};