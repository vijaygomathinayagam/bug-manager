const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

if(process.env.NODE_ENV==='development') {
    require('dotenv').config({
        path: require('path').resolve(process.cwd(), '.env.development')
    });
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api', require('./_routes').apiRouter);

console.log('printing redis host');
console.log(process.env.Redis_Host);
app.listen('8080', () => console.log('server started. Listening at 8080'));