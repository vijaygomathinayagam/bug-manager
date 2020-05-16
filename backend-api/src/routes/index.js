const apiRouter = require('express').Router();

require('./user')(apiRouter);
require('./bug')(apiRouter);

module.exports.apiRouter = require('./base').apiRouter;