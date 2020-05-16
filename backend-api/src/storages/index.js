module.exports.initStorage = async () => {
    module.exports.storage = {
        redisClient: await require('./redis')(),
        mongo: await require('./mongo')(),
    };
};