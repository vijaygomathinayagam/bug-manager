const { validSessionMiddleware } = require('./middlewares');

module.exports = (apiRouter) => {
    apiRouter.get('/bugs', validSessionMiddleware, async (req, res) => {
        res.json({ data: [{name: "bug1"}] });
    });
};