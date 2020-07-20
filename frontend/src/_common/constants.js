export let BACKEND_API_HOST = "http://bugmanager.com:9000";

if (process.env.NODE_ENV !== "production") {
  BACKEND_API_HOST = "http://localhost:8080";
}

export const GET_LOGIN_API_URL = `${BACKEND_API_HOST}/api/login-url`;
export const GET_ALL_BUGS_API_URL = `${BACKEND_API_HOST}/api/bugs`;
export const GET_BUG_API_URL = `${BACKEND_API_HOST}/api/bugs/:bugID`;
