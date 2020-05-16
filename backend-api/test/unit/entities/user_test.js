const { getLoginURL, authenticateGoogleUser } = require('../../../src/entities/user');
const assert = require('assert');
const { 
    GoogleOauthURL,
    GoogleOauthScopes,
    Google_AccessToken_URL,
    Google_UserInfo_URL,
} = require('../../../src/common').constants;

describe("testing user authentication methods", async function() {

    const fakeGoogleClientID = 'google_client_id';
    const fakeGoogleRedirectURI = 'google_redirect_url';

    before(function() {
        process.env.Google_Client_ID = fakeGoogleClientID;
        process.env.Google_Redirect_URI = fakeGoogleRedirectURI;
        process.env.Google_Client_Secret = 'fake_google_client_secret';
    })

    describe("testing getLoginURL method", async function() {
        it("url and url params should match", async function() {        
            const actualURL = new URL(await getLoginURL());
            const actualURLSearchParams = actualURL.searchParams;
    
            assert.equal(actualURL.origin + actualURL.pathname, GoogleOauthURL);
            assert.equal(actualURLSearchParams.get('client_id'), fakeGoogleClientID);
            assert.equal(actualURLSearchParams.get('redirect_uri'), fakeGoogleRedirectURI);
            assert.equal(actualURLSearchParams.get('scope'), GoogleOauthScopes);
            assert.equal(actualURLSearchParams.get('response_type'), 'code');
            assert.equal(actualURLSearchParams.get('access_type'), 'offline');
            assert.equal(actualURLSearchParams.get('prompt'), 'consent');
        })
    });

    describe("testing google authentication method", async function() {
        const fakeCodeForAccessToken = '12345';
        const fakeUserEmail = 'fakemail@gmail.com';
        let acessTokenURLNock, userInfoURLNock;
        const nock = require('nock');

        beforeEach(function() {
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

        afterEach(function() {
            nock.cleanAll();
        });
    });

    after(function() {
        process.env.Google_Client_ID = undefined;
        process.env.Google_Redirect_URI = undefined;
    })
});
