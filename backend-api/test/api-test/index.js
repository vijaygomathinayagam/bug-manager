const storage = require('../../src/storages');

const initAPITest = async () => {
    require('dotenv').config({
        path: require('path').resolve(process.cwd(), '.env.development.apitest')
    });
    await storage.initStorage();
};

const callAllApis = async () => {
    await require('./create-bug')();
    await require('./delete-bug')();
    await require('./edit-bug')();
    await require('./get-all-bugs')();
    await require('./get-allowed-users')();
    await require('./get-bug')();
    await require('./get-user-associations-bug-editable-fields')();
};

const tearDown = async () => {
    await storage.closeConnections();
};

(async () => {
    await initAPITest();
    await callAllApis();
    await tearDown();
})();