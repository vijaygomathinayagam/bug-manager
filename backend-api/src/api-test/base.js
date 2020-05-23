const storage = require('../storages');

const initAPITest = async () => {
    require('dotenv').config({
        path: require('path').resolve(process.cwd(), '.env.development.apitest')
    });
    await storage.initStorage();
};

const tearDown = async () => {
    await storage.closeConnections();
};

const run = async (apiTestFunction) => {
    await initAPITest();

    await apiTestFunction();

    await tearDown();
}

module.exports = {
    run
};