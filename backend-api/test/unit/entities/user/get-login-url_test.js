const { getLoginURL, authenticateGoogleUser } = require('../../../../src/entities/user');
const assert = require('assert');
const { 
    GoogleOauthURL,
    GoogleOauthScopes,
} = require('../../../../src/constants').googleOAuth;

const {
    setGoogleConfToProcessEnv,
    fakeGoogleClientID,
    fakeGoogleRedirectURI,
    clearGoogleConfFromProcessEnv,
} = require('../../data-factories/google-conf');

describe("testing getLoginURL method", async function() {

    before(function() {
        setGoogleConfToProcessEnv();
    })

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
    });

    after(function() {
        clearGoogleConfFromProcessEnv();
    });
});