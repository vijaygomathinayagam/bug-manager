const request = require('supertest');
const app = require('../../../src/server')();

const agent = request.agent(app);

module.exports = {
    agent
};