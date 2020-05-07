const mongoose = require('mongoose');
const { MongoDatabaseName } = require('../_common').configurations;

const bugSchema = require('./entities/bug');

module.exports = async () => {
    const models = {};
    await mongoose.connect(`mongodb://${process.env.Mongo_Host}:${process.env.Mongo_Port}/${MongoDatabaseName}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    models.bug = mongoose.model('bug', bugSchema);
    return models;
};