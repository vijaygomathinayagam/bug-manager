const axios = require('axios');
const { 
    GoogleOauthURL,
    GoogleOauthScopes,
    Google_AccessToken_URL,
    Google_UserInfo_URL
} = require('../_common');

module.exports.getLoginURL = async () => {
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

module.exports.authenticateGoogleUser = async (code) => {
    try {
        // getting access token
        const accessTokenParams = new URLSearchParams();
        accessTokenParams.append('client_id', process.env.Google_Client_ID);
        accessTokenParams.append('client_secret', process.env.Google_Client_Secret);
        accessTokenParams.append('redirect_uri', process.env.Google_Redirect_URI);
        accessTokenParams.append('grant_type', 'authorization_code');
        accessTokenParams.append('code', code);

        const { data: accessTokenReponse } = await axios({
            url: Google_AccessToken_URL,
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: accessTokenParams.toString(),
        });

        // getting user info
        const { data: userInfoResponse } = await axios({
            url: Google_UserInfo_URL,
            method: 'get',
            headers: {
                Authorization: `Bearer ${accessTokenReponse.access_token}`
            }
        });
        console.log(userInfoResponse);
    } catch(err) {
        console.log(err);
        return {
            isSuccess: false,
        };
    }
    return {
        isSuccess: true
    }
}