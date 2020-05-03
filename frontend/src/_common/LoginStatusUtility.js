const loginStatuskey = "login";
const loginStatusLoggedIn = "true";

class LoginStatusUtility {

    static setLoggedInLoginStatus() {
        window.localStorage.setItem(loginStatuskey, loginStatusLoggedIn);
    }
    
    static setLoggedOutLoginStatus() {
        window.localStorage.removeItem(loginStatuskey);
    }
    
    static isLoggedIn() {
        const loginStatus = window.localStorage.getItem(loginStatuskey);
        return loginStatus && (loginStatus === loginStatusLoggedIn);
    }
}

export default LoginStatusUtility;