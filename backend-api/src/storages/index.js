const storage = {};

module.exports = {
    initStorage: async () => {
        storage.redisClient = await require('./redis')();
        storage.mongo = await require('./mongo')();
    },
    storage: storage
}