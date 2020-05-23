const mongo = require('./mongo');
const redis = require('./redis');

const storage = {};

module.exports = {
    initStorage: async () => {
        try {
            storage.redisClient = await mongo.init();
            storage.mongo = await redis.init();
        } catch(err) {
            console.log(err);
            process.exit(1);
        }
    },
    closeConnections: async () => {
        try {
            await mongo.closeConnection();
            await redis.closeConnection();
        } catch(err) {
            console.log(err);
        }
    },
    storage: storage
}