module.exports = {
    GoogleOauthURL: 'https://accounts.google.com/o/oauth2/v2/auth',
    GoogleOauthScopes: [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
    ].join(' '),
    Google_AccessToken_URL: 'https://oauth2.googleapis.com/token',
    Google_UserInfo_URL: 'https://www.googleapis.com/oauth2/v2/userinfo',
    MongoDatabaseName: 'bug-manger'
};