const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const postRoute = require('./routes/post');
const userRoute = require('./routes/user');

app.use(bodyParser.json());
//Routes
app.use('/posts', postRoute);
app.use('/auth', userRoute);

module.exports = app