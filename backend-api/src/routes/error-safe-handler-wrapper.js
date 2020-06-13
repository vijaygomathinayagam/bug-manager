module.exports = (handlerFunction) => {
    return async (req, res, next) => {
        try {
            await handlerFunction(req, res, next);
        } catch(err) {
            console.log('unhandled error: ', err)
            res.sendStatus(500);
        }
    };
};