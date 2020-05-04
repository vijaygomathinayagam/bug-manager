module.exports = (apiRouter) => {
    apiRouter.get('/bugs', async (req, res) => {
        res.json({ data: [{name: "bug1"}] });
    });
};