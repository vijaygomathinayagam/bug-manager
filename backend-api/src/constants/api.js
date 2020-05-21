module.exports = {
    authenticationCookieName: 'bgu',

    athenticatePostmessageScript: '<script>window.opener.postMessage(#{postMessageJSON},"#{host}")</script>',
    authenticationCookieMaxAge: 24 * 60 * 60 * 1000,
}