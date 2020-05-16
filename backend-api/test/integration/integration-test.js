const initIntegrationTesting = async () => {
    // initializing env variables
    require('dotenv').config({
        path: require('path').resolve(process.cwd(), '.env.test.integration')
    });

    // intiating storage connections
    await require('../../src/_storage/index').initStorage();

    // seeding test data
    // await require('./integration/seed/bug-seed').seed();

    // calling the API tests
    await require('./integration/api-test/user').testAPI();
    await require('./integration/api-test/bug').testAPI();
};

initIntegrationTesting();