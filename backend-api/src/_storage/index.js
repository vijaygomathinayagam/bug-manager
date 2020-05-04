module.exports = {
    redisClient: require('./redis'),
    mongo: {
        bug: require('./entities/bug')
    }
}