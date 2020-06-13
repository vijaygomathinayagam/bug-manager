const { run } = require('./base');

run(async () => {
    const { getAllowedUsersHandler } = require('../handlers/user');
    const expressReq = {};
    const expressRes = {
        json: (response) => console.log(response),
    };

    await getAllowedUsersHandler(expressReq, expressRes);
});