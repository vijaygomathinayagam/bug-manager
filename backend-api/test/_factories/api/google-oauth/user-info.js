const nock = require('nock');
const { Google_UserInfo_URL } = require('../../../../src/constants').googleOAuth;

const userInfoURL = new URL(Google_UserInfo_URL);
require('../base');

let responseObj, authorizationAccessToken;

module.exports = {
    getNock: () => {
        return nock(userInfoURL.origin)
            .matchHeader('Authorization', `Bearer ${authorizationAccessToken}`)
            .get(userInfoURL.pathname)
            .reply(200, responseObj);
    },
    get500ErrorNock: () => {
        return nock(userInfoURL.origin)
            .matchHeader('Authorization', `Bearer ${authorizationAccessToken}`)
            .get(userInfoURL.pathname)
            .reply(500, {
                msg: 'server side error'
            });
    },
    setResponseObj: function(email) {
        responseObj = {
            email
        };
        return this;
    },
    setAuthorizationAccessToken: function(accessToken) {
        authorizationAccessToken = accessToken;
        return this;
    }
};