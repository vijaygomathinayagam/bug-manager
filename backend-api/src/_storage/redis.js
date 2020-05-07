const util = require('util')
const redis = require("redis");

module.exports = async () => {
    const client = redis.createClient({
        host: process.env.Redis_Host
    });
    
    return {
        hgetAsync: util.promisify(client.hget).bind(client),
        hdelAsync: util.promisify(client.hdel).bind(client),
        hsetAsync: util.promisify(client.hset).bind(client)
    }
};