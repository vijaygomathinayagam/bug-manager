const { 
    GoogleOauthURL,
    GoogleOauthScopes,
} = require('../../constants').googleOAuth;

module.exports = async () => {
    const loginURL = new URL(GoogleOauthURL);

    // params
    const params = new URLSearchParams();
    params.append('client_id', process.env.Google_Client_ID);
    params.append('redirect_uri', process.env.Google_Redirect_URI);
    params.append('scope', GoogleOauthScopes);
    params.append('response_type', 'code');
    params.append('access_type', 'offline');
    params.append('prompt', 'consent');
    loginURL.search = params.toString();

    return loginURL.toString();    
}