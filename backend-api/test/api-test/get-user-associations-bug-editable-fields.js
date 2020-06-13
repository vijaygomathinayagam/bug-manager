module.exports = async () => {
    const { getEditableFieldsForUserAssociationsHandler } = require('../../src/handlers/bug');

    const expressReq = {
    };
    const expressRes = {
        json: (response) => console.log(response),
    };

    await getEditableFieldsForUserAssociationsHandler(expressReq, expressRes);
};