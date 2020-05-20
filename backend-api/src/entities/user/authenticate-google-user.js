const axios = require('axios');
const { 
    Google_AccessToken_URL,
    Google_UserInfo_URL
} = require('../../constants').googleOAuth;

const _getGoogleAccessToken = async (code) => {
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

const _getUserInfo = async (accessToken) => {
    return await axios({
        url: Google_UserInfo_URL,
        method: 'get',
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
};

module.exports = async (code) => {
    try {
        // getting access token
        const { status: accessTokenStatus, data: accessTokenReponse } = await _getGoogleAccessToken(code);
        if (accessTokenStatus !== 200) {
            return {
                isSuccess: false,
            };
        }
        
        // getting user info
        const { status: userInfoStatus, data: { email: userEmail } } = await _getUserInfo(accessTokenReponse.access_token);
        if(userInfoStatus !== 200) {
            return {
                isSuccess: false,
            };
        }
        
        return {
            isSuccess: true,
            userEmail: userEmail,
        };
    } catch(err) {
        console.log(err);
        return {
            isSuccess: false,
        };
    }
}