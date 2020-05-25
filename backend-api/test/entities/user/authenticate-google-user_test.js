const assert = require('assert');
const nock = require('nock');
const { authenticateGoogleUser } = require('../../../src/entities/user');
const { setGoogleConfToProcessEnv, clearGoogleConfFromProcessEnv } = require('../../_factories/data/google-conf');

describe("testing google authenticate-google-user method", async function() {
    const fakeCodeForAccessToken = '12345';
    const fakeUserEmail = 'testuser@gmail.com';
    let acessTokenURLNock, userInfoURLNock;

    before(function() {
        setGoogleConfToProcessEnv();
    });

    describe("for invalid code", async function() {
        beforeEach(function() {
            acessTokenURLNock = require('../../_factories/api/google-oauth/access-token')
                .setRequestObject(fakeCodeForAccessToken)
                .get400ErrorNock();
        });

        it("should return isSuccess as false", async function() {
            const authenticateResponse = await authenticateGoogleUser(fakeCodeForAccessToken);
            assert(acessTokenURLNock.isDone());
            assert.deepEqual(authenticateResponse, {
                isSuccess: false,
            });
        });
    });

    describe("for valid code, but failed in getting user info", async function() {
        beforeEach(function() {
            const fakeAccessToken = 'access_123';

            acessTokenURLNock = require('../../_factories/api/google-oauth/access-token')
                .setRequestObject(fakeCodeForAccessToken)
                .setResponseObject(fakeAccessToken)
                .getNock();
            userInfoURLNock = require('../../_factories/api/google-oauth/user-info')
                .setResponseObj(fakeUserEmail)
                .setAuthorizationAccessToken(fakeAccessToken)
                .get500ErrorNock();
        });

        it("should return isSuccess as false", async function() {
            const authenticateResponse = await authenticateGoogleUser(fakeCodeForAccessToken);
            assert(acessTokenURLNock.isDone());
            assert(userInfoURLNock.isDone());
            assert.deepEqual(authenticateResponse, {
                isSuccess: false,
            });
        });
    });

    describe("for valid code and access token", async function() {
        beforeEach(function() {
            const fakeAccessToken = 'access_123';
            acessTokenURLNock = require('../../_factories/api/google-oauth/access-token')
                .setRequestObject(fakeCodeForAccessToken)
                .setResponseObject(fakeAccessToken)
                .getNock();
            userInfoURLNock = require('../../_factories/api/google-oauth/user-info')
                .setResponseObj(fakeUserEmail)
                .setAuthorizationAccessToken(fakeAccessToken)
                .getNock();
        });

        it("should return user email and issuccess should be true", async function() {
            const authenticateResponse = await authenticateGoogleUser(fakeCodeForAccessToken);
            assert(acessTokenURLNock.isDone());
            assert(userInfoURLNock.isDone());
            assert.deepEqual(authenticateResponse, {
                isSuccess: true,
                userEmail: fakeUserEmail,
            });
        });
    });
    
    afterEach(function() {
        nock.cleanAll();
    });

    after(function() {
        clearGoogleConfFromProcessEnv();
    });
});