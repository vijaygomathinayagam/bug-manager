module.exports = () => {
    const express = require('express');
    const app = express();
    const cookieParser = require('cookie-parser');
    
    // starting express server
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    
    app.use(cookieParser());
    
    app.use('/api', require('./routes'));
    return app;
};
