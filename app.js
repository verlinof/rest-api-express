const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const postRoute = require('./routes/post');

app.use(bodyParser.json());
//Routes
app.use('/posts', postRoute);

module.exports = app