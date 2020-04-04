const express = require('express');
const app = express();

app.get('/api', (req, res) => res.send('Hello world!!'));

app.listen('8080', () => console.log('server started. Listening at 8080'));