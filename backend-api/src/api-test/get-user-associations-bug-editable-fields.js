const { run } = require('./base');
const { bugModel } = require('../entities/bug');


run(async () => {
    const { getEditableFieldsForUserAssociationsHandler } = require('../handlers/bug');

    const expressReq = {
    };
    const expressRes = {
        json: (response) => console.log(response),
    };

    await getEditableFieldsForUserAssociationsHandler(expressReq, expressRes);
});