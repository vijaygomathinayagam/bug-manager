const randomstring = require("randomstring");
const { RedisSessionKeyValueMapping, RedisSessionValueKeyMapping } = require('../common').constants;

// to prevent auto execution of code while requiring
const _getRedisClient = () => require('.').storage.redisClient;

const deleteSession = async (sessionKey) => {
    const sessionValue = await _getRedisClient().hgetAsync(RedisSessionKeyValueMapping, sessionKey);
    await redisClient.hdelAsync(RedisSessionKeyValueMapping, sessionValue);
    if (sessionValue) {
        await redisClient.hdelAsync(RedisSessionValueKeyMapping, sessionValue);
    }
};

// also used as refesh
const createSession = async (sessionKey) => {
    await deleteSession(sessionKey);
    const sessionValue = randomstring.generate(7);
    await _getRedisClient().hsetAsync(RedisSessionKeyValueMapping, sessionKey, sessionValue);
    await _getRedisClient().hsetAsync(RedisSessionValueKeyMapping, sessionValue, sessionKey);
    return sessionValue;
};

const isSessionValid = async (sessionValue) => {
    const value = _getRedisClient().hgetAsync(RedisSessionValueKeyMapping, sessionValue);
    return value != null;
};

module.exports = {
    deleteSession,
    createSession,
    isSessionValid,
};