module.exports = async () => {
    const { getAllowedUsersHandler } = require('../../src/handlers/user');
    const expressReq = {};
    const expressRes = {
        json: (response) => console.log(response),
    };

    await getAllowedUsersHandler(expressReq, expressRes);
};