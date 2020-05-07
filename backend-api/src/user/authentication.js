const axios = require('axios');
const { 
    GoogleOauthURL,
    GoogleOauthScopes,
    Google_AccessToken_URL,
    Google_UserInfo_URL
} = require('../_common').configurations;
const { createSession } = require('./session');

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

const getGoogleAccessToken = async (code) => {
    const accessTokenParams = new URLSearchParams();
    accessTokenParams.append('client_id', process.env.Google_Client_ID);
    accessTokenParams.append('client_secret', process.env.Google_Client_Secret);
    accessTokenParams.append('redirect_uri', process.env.Google_Redirect_URI);
    accessTokenParams.append('grant_type', 'authorization_code');
    accessTokenParams.append('code', code);
    
    return await axios({
        url: Google_AccessToken_URL,
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: accessTokenParams.toString(),
    });
};

const getUserInfo = async (accessToken) => {
    return await axios({
        url: Google_UserInfo_URL,
        method: 'get',
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
};

module.exports.authenticateGoogleUser = async (code) => {
    try {
        // getting access token
        const { data: accessTokenReponse } = await getGoogleAccessToken(code);

        // getting user info
        const { data: userInfoResponse } = await getUserInfo(accessTokenReponse.access_token);

        // create user session
        const { email } =  userInfoResponse;
        const { sessionKey, sessionKeyStatus } = await createSession(userInfoResponse.email);
        
        if(sessionKeyStatus) {
            return {
                isSuccess: true,
                sessionKey: sessionKey
            }
        } else {
            throw new Error(`${email} is not an allowed user`);
        }
    } catch(err) {
        console.log(err);
        return {
            isSuccess: false,
        };
    }
}