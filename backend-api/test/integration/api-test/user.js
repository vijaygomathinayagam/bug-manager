const axios = require('axios');

module.exports.testAPI = async () => {
    const response = await axios.get('http://localhost:8080/api/login-url');
    const url = response.data.url;
};