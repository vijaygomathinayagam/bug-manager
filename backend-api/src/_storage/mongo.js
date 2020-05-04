const mongoose = require('mongoose');
const { MongoDatabaseName } = require('../_common/configuration');
mongoose.connect(`mongodb://${process.env.Mongo_Host}:${process.env.Mongo_Port}/${MongoDatabaseName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = mongoose