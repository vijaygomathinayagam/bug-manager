const sinon = require('sinon');
const userEntity = require('../../../src/entities/user');
const htmlTemplateParser = require('../../../src/common/html-template-parser');
const sessionStorage = require('../../../src/common/session');
const {
    ErrorCodeLoginAPIAuthenticationFailed,
    ErrorCodeLoginAPIUserNotAllowed,
    SuccessCodeLoginAPILoginSuccess
} = require('../../../src/constants').messageCode;
const {
    authenticationCookieName,
    athenticatePostmessageScript,
    authenticationCookieMaxAge
} = require('../../../src/constants').api;
const { authenticateGoogleUserHandler } = require('../../../src/handlers/user');

describe('authenticateGoogleUserHandler method', async function() {

    const expressReq = {
        query: {
            code: '12345',
        }
    };
    let expressRes;
    let parseHTMLTemplateStub;
    const fakeParsedHTML = '<h1>Fake html string</h1>';

    before(function() {
        process.env.Server_Host = 'fakeServerHost';
    });

    beforeEach(function() {
        expressRes = {
            set: sinon.stub(),
            send: sinon.stub(),
        };
        parseHTMLTemplateStub = sinon.stub(htmlTemplateParser, 'parseHTMLTemplate').callsFake(() => fakeParsedHTML);
    });

    describe('when userEntity.authenticateGoogleUser is not success', async function() {

        let authenticateGoogleUserStub;

        beforeEach(function() {
            authenticateGoogleUserStub = sinon.stub(userEntity, 'authenticateGoogleUser').callsFake(async () => {
                return {
                    isSuccess: false,
                };
            });
        });

        it(`should send postmessage obj with ErrorCodeLoginAPIAuthenticationFailed message code
            and isLoginSuccess as false`, async function() {
            await authenticateGoogleUserHandler(expressReq, expressRes);
            const expectedPostMessageData = {
                messageCode: ErrorCodeLoginAPIAuthenticationFailed,
                isLoginSuccess: false,
            };
            sinon.assert.calledWith(authenticateGoogleUserStub, expressReq.query.code);
            sinon.assert.calledWith(expressRes.set, 'Content-Type', 'text/html');
            sinon.assert.calledWith(parseHTMLTemplateStub, athenticatePostmessageScript, {
                postMessageJSON: JSON.stringify(expectedPostMessageData),
                host: process.env.Server_Host
            });
            sinon.assert.calledWith(expressRes.send, fakeParsedHTML);
        });

        afterEach(function() {
            userEntity.authenticateGoogleUser.restore();
        });
    });

    describe('when userEntity.authenticateGoogleUser is success and returned user is not allowed user', async function() {
        
        let authenticateGoogleUserStub, isAllowedUserStub;
        
        beforeEach(function() {
            const fakeNotAllowedUserEmail = 'notalloweduser@gmail.com';
            authenticateGoogleUserStub = sinon.stub(userEntity, 'authenticateGoogleUser').callsFake(async () => {
                return {
                    isSuccess: true,
                    userEmail: fakeNotAllowedUserEmail
                };
            });
            isAllowedUserStub = sinon.stub(userEntity, 'isAllowedUser')
                .withArgs(fakeNotAllowedUserEmail)
                .returns(false);
        });

        it(`should send postmessage obj with ErrorCodeLoginAPIUserNotAllowed message code 
            and isLoginSuccess as false`, async function() {
            await authenticateGoogleUserHandler(expressReq, expressRes);
            const expectedPostMessageData = {
                messageCode: ErrorCodeLoginAPIUserNotAllowed,
                isLoginSuccess: false,
            };
            sinon.assert.calledWith(authenticateGoogleUserStub, expressReq.query.code);
            sinon.assert.calledOnce(isAllowedUserStub);
            sinon.assert.calledWith(expressRes.set, 'Content-Type', 'text/html');
            sinon.assert.calledWith(parseHTMLTemplateStub, athenticatePostmessageScript, {
                postMessageJSON: JSON.stringify(expectedPostMessageData),
                host: process.env.Server_Host
            });
            sinon.assert.calledWith(expressRes.send, fakeParsedHTML);
        });

        afterEach(function() {
            userEntity.authenticateGoogleUser.restore();
            userEntity.isAllowedUser.restore();
        });
    });

    describe('when userEntity.authenticateGoogleUser is success and returned user is allowed user', async function() {

        let authenticateGoogleUserStub, isAllowedUserStub;
        let createSessionStub;
        const fakeSessionValue = 'fakeSessionValue';
        const fakeAllowedUserEmail = 'alloweduser@gmail.com';
        
        beforeEach(function() {
            authenticateGoogleUserStub = sinon.stub(userEntity, 'authenticateGoogleUser').callsFake(async () => {
                return {
                    isSuccess: true,
                    userEmail: fakeAllowedUserEmail
                };
            });
            isAllowedUserStub = sinon.stub(userEntity, 'isAllowedUser')
                .withArgs(fakeAllowedUserEmail)
                .returns(true);
            expressRes.cookie = sinon.stub();
            createSessionStub = sinon.stub(sessionStorage, 'createSession').callsFake(async () => fakeSessionValue);
        });

        it(`should send postmessage obj with SuccessCodeLoginAPILoginSuccess message code,
            set session in cookie with max age and http true
            and isLoginSuccess as true`, async function() {
            await authenticateGoogleUserHandler(expressReq, expressRes);
            const expectedPostMessageData = {
                messageCode: SuccessCodeLoginAPILoginSuccess,
                isLoginSuccess: true,
            };
            sinon.assert.calledWith(createSessionStub, fakeAllowedUserEmail);
            sinon.assert.calledWith(authenticateGoogleUserStub, expressReq.query.code);
            sinon.assert.calledOnce(isAllowedUserStub);
            sinon.assert.calledWith(expressRes.cookie,
                authenticationCookieName,
                fakeSessionValue,
                { maxAge: authenticationCookieMaxAge, httpOnly: true });
            sinon.assert.calledWith(expressRes.set, 'Content-Type', 'text/html');
            sinon.assert.calledWith(parseHTMLTemplateStub, athenticatePostmessageScript, {
                postMessageJSON: JSON.stringify(expectedPostMessageData),
                host: process.env.Server_Host
            });
            sinon.assert.calledWith(expressRes.send, fakeParsedHTML);
        });

        afterEach(function() {
            userEntity.authenticateGoogleUser.restore();
            userEntity.isAllowedUser.restore();
            sessionStorage.createSession.restore();
        });
    });

    afterEach(function() {
        htmlTemplateParser.parseHTMLTemplate.restore();
        expressRes = undefined;
        parseHTMLTemplateStub = undefined;
    });

    after(function() {
        process.env.Server_Host = undefined;
    });
});