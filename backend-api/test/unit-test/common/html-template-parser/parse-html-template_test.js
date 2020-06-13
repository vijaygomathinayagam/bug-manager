const assert = require('assert');
const { parseHTMLTemplate } = require('../../../../src/common/html-template-parser');

describe("parseHTMLTemplate", async function() {

    it("it should replace the variables in html string", async function() {
        const htmlString = '<h1>Hello #{name}!!, welcome to the #{place}.</h1><h2>Thank you #{name}</h2>';
        const expectedHTMLStrnig = '<h1>Hello world!!, welcome to the zoo.</h1><h2>Thank you world</h2>';
        const variables = {
            name: 'world',
            place: 'zoo',
        };
        assert.equal(parseHTMLTemplate(htmlString, variables), expectedHTMLStrnig);
    });
});