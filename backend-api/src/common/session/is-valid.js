const { redisClient } = require('../../storages').storage;
const {
    RedisSessionValueKeyMapping
} = require('../../constants').storageRedis;

module.exports.isSessionValid = async (sessionValue) => {
    const sessionKey = redisClient.hgetAsync(RedisSessionValueKeyMapping, sessionValue);
    if(sessionKey != null) {
        return {
            exists: true,
            sessionKey: sessionKey,
        };
    }
    return { exists: false };
};