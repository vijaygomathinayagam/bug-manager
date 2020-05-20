const { getLoginURL, authenticateGoogleUser } = require('../../../../src/entities/user');
const assert = require('assert');
const { 
    Google_AccessToken_URL,
    Google_UserInfo_URL,
} = require('../../../../src/constants').googleOAuth;
const { setGoogleConfToProcessEnv, clearGoogleConfFromProcessEnv } = require('../../data-factories/google-conf');

describe("testing google authenticate-google-user method", async function() {
    const fakeCodeForAccessToken = '12345';
    const fakeUserEmail = 'fakemail@gmail.com';
    let acessTokenURLNock, userInfoURLNock;
    const nock = require('nock');

    before(function() {
        setGoogleConfToProcessEnv();

        const axios = require('axios');
        const fakeAccessToken = 'acess_123';

        axios.defaults.adapter = require('axios/lib/adapters/http');
        const accessTokenURL = new URL(Google_AccessToken_URL);
        const userInfoURL = new URL(Google_UserInfo_URL);

        acessTokenURLNock = nock(accessTokenURL.origin)
            .matchHeader('Content-Type', 'application/x-www-form-urlencoded')
            .post(accessTokenURL.pathname, {
                client_id: process.env.Google_Client_ID,
                client_secret: process.env.Google_Client_Secret,
                redirect_uri: process.env.Google_Redirect_URI,
                grant_type: 'authorization_code',
                code: fakeCodeForAccessToken,
            })
            .reply(200, {
                access_token: fakeAccessToken,
            });
        
        userInfoURLNock = nock(userInfoURL.origin)
            .matchHeader('Authorization', `Bearer ${fakeAccessToken}`)
            .get(userInfoURL.pathname)
            .reply(200, {
                email: fakeUserEmail
            });
    })

    it("it should return user email and issuccess should be true", async function() {
        const authenticateResponse = await authenticateGoogleUser(fakeCodeForAccessToken);
        assert(acessTokenURLNock.isDone());
        assert(userInfoURLNock.isDone());
        assert.deepEqual(authenticateResponse, {
            isSuccess: true,
            userEmail: fakeUserEmail,
        });
    });

    after(function() {
        nock.cleanAll();
        clearGoogleConfFromProcessEnv();
    });
});