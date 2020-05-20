const sinon = require('sinon');
const session = require('../../../../src/common/session');
const sessionCheckMiddleWares = require('../../../../src/middlewares/session-check');
const { authenticationCookieName } = require('../../../../src/constants').api;

describe("session-check middlewares", async function() {

    describe("validSessionMiddleware method", async function() {

        const validSessionValue = 'validSessionValue';
        let expressRes, expressNext, isSessionValidStub;

        before(function() {
            isSessionValidStub = sinon.stub(session, 'isSessionValid').callsFake(async (sessionValue) => {
                return (validSessionValue === sessionValue);
            });
        });

        beforeEach(function() {
            expressRes = {
                sendStatus: sinon.stub(),
            }
            expressNext = sinon.stub();
        });

        it("if authentication cookie is not set in request, it should sent 401", async function() {
            const expressReq = {
                cookies: {}
            };
            await sessionCheckMiddleWares.validSessionMiddleware(expressReq, expressRes, expressNext);
            sinon.assert.notCalled(isSessionValidStub);
            sinon.assert.calledWith(expressRes.sendStatus, 401);
            sinon.assert.notCalled(expressNext);
        });

        it("if authentication cookie is provided is invalid, it should return 401", async function() {
            const invalidSessionValue = 'invalidSessionValue';
            const cookies = {};
            cookies[authenticationCookieName] = invalidSessionValue;
            const passedSessionValue = invalidSessionValue;
            
            const expressReq = {
                cookies: cookies
            };
            await sessionCheckMiddleWares.validSessionMiddleware(expressReq, expressRes, expressNext);
            sinon.assert.calledWith(isSessionValidStub, passedSessionValue);
            sinon.assert.calledWith(expressRes.sendStatus, 401);
            sinon.assert.notCalled(expressNext);
        });

        it("if authentication cookie is provided is valid, it should call next", async function() {
            const cookies = {};
            cookies[authenticationCookieName] = validSessionValue;
            const passedSessionValue = validSessionValue;

            const expressReq = {
                cookies: cookies
            };
            await sessionCheckMiddleWares.validSessionMiddleware(expressReq, expressRes, expressNext);
            sinon.assert.calledWith(isSessionValidStub, passedSessionValue);
            sinon.assert.notCalled(expressRes.sendStatus);
            sinon.assert.calledOnce(expressNext);
        });

        afterEach(function() {
            expressRes = undefined;
            expressNext = undefined;
        });

        after(function() {
            session.isSessionValid.restore();
        });
    });
});