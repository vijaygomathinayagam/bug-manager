const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', require('./_routes').apiRouter);

app.listen('8080', () => console.log('server started. Listening at 8080'));