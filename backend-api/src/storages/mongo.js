const mongoose = require('mongoose');

const bugSchema = require('../entities/bug');

module.exports = async () => {
    await mongoose.connect(`mongodb://${process.env.Mongo_Host}:${process.env.Mongo_Port}/${process.env.Mongo_Database_Name}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};