const nock = require('nock');
const { Google_AccessToken_URL } = require('../../../../src/constants').googleOAuth;

const accessTokenURL = new URL(Google_AccessToken_URL);
require('../base');

let requestObj, responseObj;

module.exports = {
    getNock: () => {
        return nock(accessTokenURL.origin)
            .matchHeader('Content-Type', 'application/x-www-form-urlencoded')
            .post(accessTokenURL.pathname, requestObj)
            .reply(200, responseObj);
    },
    get400ErrorNock: () => {
        return nock(accessTokenURL.origin)
        .matchHeader('Content-Type', 'application/x-www-form-urlencoded')
        .post(accessTokenURL.pathname, requestObj)
        .reply(400, {
            msg: 'invalid data',
        })
    },
    setRequestObject: function(code) {
        requestObj = {
            client_id: process.env.Google_Client_ID,
            client_secret: process.env.Google_Client_Secret,
            redirect_uri: process.env.Google_Redirect_URI,
            grant_type: 'authorization_code',
            code: code,
        }
        return this;
    },
    setResponseObject: function(accessToken) {
        responseObj = {
            access_token: accessToken,
        };
        return this;
    },
};