const fs = require('fs');
const path = require('path');
const randomstring = require("randomstring");

const redisClient = require('../_storage').storage.redisClient;
const emailSessionKeyMapping = 'emailSessionKeyMapping';
const sessionKeyEmailMapping = 'sessionKeyEmailMapping';

const allowedUsersList = fs.readFileSync(path.resolve(__dirname, '../_common/allowed_users')).toString().trim().split('\n');

const isAllowedUser = async (userEmail) => {
    return allowedUsersList.includes(userEmail);
}

const deleteSession = async (userEmail) => {
    const sessionKey = await redisClient.hgetAsync(emailSessionKeyMapping, userEmail);
    await redisClient.hdelAsync(emailSessionKeyMapping, userEmail);
    if (sessionKey) {
        await redisClient.hdelAsync(sessionKeyEmailMapping, sessionKey);
    }
};

// also used as refesh
const createSession = async (userEmail) => {
    if(isAllowedUser(userEmail)) {
        await deleteSession(userEmail);
        const sessionKey = randomstring.generate(7);
        await redisClient.hsetAsync(emailSessionKeyMapping, userEmail, sessionKey);
        await redisClient.hsetAsync(sessionKeyEmailMapping, sessionKey, userEmail);
        return {
            sessionKey: sessionKey,
            sessionKeyStatus: true,
        }
    }
    return {
        sessionKeyStatus: false,
    };
};

const isSessionValid = async (sessionKey) => {
    const value = redisClient.hgetAsync(sessionKeyEmailMapping, sessionKey);
    return value != null;
};

module.exports = {
    deleteSession,
    createSession,
    isSessionValid,
};