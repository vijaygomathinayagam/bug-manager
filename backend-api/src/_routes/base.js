const apiRouter = require('express').Router();

require('./authentication')(apiRouter);
require('./bug')(apiRouter);

module.exports.apiRouter = apiRouter;