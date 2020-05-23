const fakeGoogleClientID = 'fake_google_client_id';
const fakeGoogleRedirectURI = 'fake_google_redirect_url';
const fakeGoogleClientSecret = 'fake_google_client_secret';

const setGoogleConfToProcessEnv = () => {
    process.env.Google_Client_ID = fakeGoogleClientID;
    process.env.Google_Redirect_URI = fakeGoogleRedirectURI;
    process.env.Google_Client_Secret = fakeGoogleClientSecret;
}

const clearGoogleConfFromProcessEnv = () => {
    process.env.Google_Client_ID = undefined;
    process.env.Google_Redirect_URI = undefined;
    process.env.Google_Client_Secret = undefined;
};

module.exports = {
    fakeGoogleClientID,
    fakeGoogleRedirectURI,
    fakeGoogleClientSecret,
    setGoogleConfToProcessEnv,
    clearGoogleConfFromProcessEnv,
};