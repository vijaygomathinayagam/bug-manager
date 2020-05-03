const apiRouter = require('express').Router();

require('./authentication')(apiRouter);

module.exports.apiRouter = apiRouter;