const util = require('util')
const redis = require("redis");

let client;

const init = async () => {
    client = redis.createClient({
        host: process.env.Redis_Host
    });

    return {
        hgetAsync: util.promisify(client.hget).bind(client),
        hdelAsync: util.promisify(client.hdel).bind(client),
        hsetAsync: util.promisify(client.hset).bind(client)
    }
};

const closeConnection = async () => {
    await client.quit();
};

module.exports = {
    init,
    closeConnection,
};