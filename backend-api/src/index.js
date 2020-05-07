const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

const initServer = async () => {
    // initializing env variables
    if(process.env.NODE_ENV==='development') {
        require('dotenv').config({
            path: require('path').resolve(process.cwd(), '.env.development')
        });
    }
    // initializing storage
    await require('./_storage').initStorage();
    
    // starting express server
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(cookieParser());
    
    app.use('/api', require('./_routes').apiRouter);
    app.listen('8080', () => console.log('server started. Listening at 8080'));
};

try {
    initServer();
} catch(err) { 
    console.log(err); 
}