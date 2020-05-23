const mongoose = require('mongoose');

const init = async () => {
    await mongoose.connect(`mongodb://${process.env.Mongo_Host}:${process.env.Mongo_Port}/${process.env.Mongo_Database_Name}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};

const closeConnection = async () => {
    await mongoose.connection.close();
};

module.exports = {
    init,
    closeConnection,
};